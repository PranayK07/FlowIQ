import { PriceData, ExitSignal } from '@/types/trading';

/**
 * Calculate RSI (Relative Strength Index)
 */
function calculateRSI(data: PriceData[], period: number = 14): number[] {
  const rsi: number[] = [];
  
  if (data.length < period + 1) {
    return new Array(data.length).fill(50);
  }
  
  for (let i = 0; i < period; i++) {
    rsi.push(50);
  }
  
  for (let i = period; i < data.length; i++) {
    let gains = 0;
    let losses = 0;
    
    for (let j = i - period + 1; j <= i; j++) {
      const change = data[j].close - data[j - 1].close;
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }
    
    const avgGain = gains / period;
    const avgLoss = losses / period;
    
    if (avgLoss === 0) {
      rsi.push(100);
    } else {
      const rs = avgGain / avgLoss;
      rsi.push(100 - (100 / (1 + rs)));
    }
  }
  
  return rsi;
}

/**
 * RSI-based exit algorithm
 */
export function computeRSIExits(
  data: PriceData[], 
  oversold: number = 30, 
  overbought: number = 70
): ExitSignal[] {
  const rsiValues = calculateRSI(data);
  const signals: ExitSignal[] = [];
  
  for (let i = 1; i < data.length; i++) {
    const rsi = rsiValues[i];
    const prevRSI = rsiValues[i - 1];
    
    if (prevRSI <= oversold && rsi > oversold) {
      signals.push({
        timestamp: data[i].timestamp,
        price: data[i].close,
        algorithm: 'RSI',
        signal: 'buy',
        confidence: Math.min((oversold - prevRSI) / oversold, 1),
        reason: `RSI crossed above ${oversold} (oversold)`,
      });
    } else if (prevRSI >= overbought && rsi < overbought) {
      signals.push({
        timestamp: data[i].timestamp,
        price: data[i].close,
        algorithm: 'RSI',
        signal: 'sell',
        confidence: Math.min((prevRSI - overbought) / (100 - overbought), 1),
        reason: `RSI crossed below ${overbought} (overbought)`,
      });
    }
  }
  
  return signals;
}

/**
 * Calculate Moving Average
 */
function calculateMA(data: PriceData[], period: number): number[] {
  const ma: number[] = [];
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      ma.push(data[i].close);
    } else {
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) {
        sum += data[j].close;
      }
      ma.push(sum / period);
    }
  }
  
  return ma;
}

/**
 * Moving Average Crossover exit algorithm
 */
export function computeMAExits(
  data: PriceData[],
  shortPeriod: number = 10,
  longPeriod: number = 30
): ExitSignal[] {
  const shortMA = calculateMA(data, shortPeriod);
  const longMA = calculateMA(data, longPeriod);
  const signals: ExitSignal[] = [];
  
  for (let i = 1; i < data.length; i++) {
    const prevShort = shortMA[i - 1];
    const prevLong = longMA[i - 1];
    const currShort = shortMA[i];
    const currLong = longMA[i];
    
    // Golden Cross (buy signal)
    if (prevShort <= prevLong && currShort > currLong) {
      signals.push({
        timestamp: data[i].timestamp,
        price: data[i].close,
        algorithm: 'Moving Average',
        signal: 'buy',
        confidence: Math.min((currShort - currLong) / currLong, 1),
        reason: `MA${shortPeriod} crossed above MA${longPeriod}`,
      });
    }
    // Death Cross (sell signal)
    else if (prevShort >= prevLong && currShort < currLong) {
      signals.push({
        timestamp: data[i].timestamp,
        price: data[i].close,
        algorithm: 'Moving Average',
        signal: 'sell',
        confidence: Math.min((currLong - currShort) / currLong, 1),
        reason: `MA${shortPeriod} crossed below MA${longPeriod}`,
      });
    }
  }
  
  return signals;
}

/**
 * Trend-based exit algorithm using price momentum
 */
export function computeTrendExits(
  data: PriceData[],
  threshold: number = 0.03
): ExitSignal[] {
  const signals: ExitSignal[] = [];
  const lookback = 5;
  
  for (let i = lookback; i < data.length; i++) {
    const currentPrice = data[i].close;
    const pastPrice = data[i - lookback].close;
    const change = (currentPrice - pastPrice) / pastPrice;
    
    // Strong upward trend - consider taking profit
    if (change > threshold) {
      signals.push({
        timestamp: data[i].timestamp,
        price: currentPrice,
        algorithm: 'Trend',
        signal: 'sell',
        confidence: Math.min(change / threshold, 1),
        reason: `Strong upward trend detected (${(change * 100).toFixed(2)}% gain)`,
      });
    }
    // Strong downward trend - consider cutting losses
    else if (change < -threshold) {
      signals.push({
        timestamp: data[i].timestamp,
        price: currentPrice,
        algorithm: 'Trend',
        signal: 'sell',
        confidence: Math.min(Math.abs(change) / threshold, 1),
        reason: `Downward trend detected (${(change * 100).toFixed(2)}% loss)`,
      });
    }
  }
  
  return signals;
}

/**
 * Bollinger Bands exit algorithm
 */
export function computeBollingerExits(
  data: PriceData[],
  period: number = 20,
  stdDev: number = 2
): ExitSignal[] {
  const signals: ExitSignal[] = [];
  const ma = calculateMA(data, period);
  
  for (let i = period; i < data.length; i++) {
    // Calculate standard deviation
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      sum += Math.pow(data[j].close - ma[i], 2);
    }
    const std = Math.sqrt(sum / period);
    
    const upper = ma[i] + stdDev * std;
    const lower = ma[i] - stdDev * std;
    const price = data[i].close;
    
    // Price touches upper band - sell signal
    if (price >= upper) {
      signals.push({
        timestamp: data[i].timestamp,
        price: price,
        algorithm: 'Bollinger Bands',
        signal: 'sell',
        confidence: Math.min((price - upper) / upper, 1),
        reason: 'Price reached upper Bollinger Band',
      });
    }
    // Price touches lower band - buy signal
    else if (price <= lower) {
      signals.push({
        timestamp: data[i].timestamp,
        price: price,
        algorithm: 'Bollinger Bands',
        signal: 'buy',
        confidence: Math.min((lower - price) / lower, 1),
        reason: 'Price reached lower Bollinger Band',
      });
    }
  }
  
  return signals;
}

/**
 * Compute exit points using specified algorithm
 */
export function computeExitPoints(
  data: PriceData[],
  algorithm: string,
  parameters?: Record<string, number>
): ExitSignal[] {
  switch (algorithm.toLowerCase()) {
    case 'rsi':
      return computeRSIExits(
        data,
        parameters?.oversold || 30,
        parameters?.overbought || 70
      );
    case 'movingaverage':
    case 'ma':
      return computeMAExits(
        data,
        parameters?.shortPeriod || 10,
        parameters?.longPeriod || 30
      );
    case 'trend':
      return computeTrendExits(
        data,
        parameters?.threshold || 0.03
      );
    case 'bollinger':
      return computeBollingerExits(
        data,
        parameters?.period || 20,
        parameters?.stdDev || 2
      );
    default:
      return computeRSIExits(data);
  }
}
