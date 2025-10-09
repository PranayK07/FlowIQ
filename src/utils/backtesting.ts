import { PriceData, ExitSignal, BacktestResult, Trade } from '@/types/trading';

/**
 * Backtest an exit strategy on historical data
 */
export function backtestStrategy(
  data: PriceData[],
  signals: ExitSignal[],
  initialCapital: number = 10000,
  positionSize: number = 1.0
): BacktestResult {
  const trades: Trade[] = [];
  let inPosition = false;
  let entryPrice = 0;
  let entryDate = '';
  let capital = initialCapital;
  let maxCapital = initialCapital;
  let maxDrawdown = 0;
  
  // Sort signals by timestamp
  const sortedSignals = [...signals].sort((a, b) => a.timestamp - b.timestamp);
  
  for (const signal of sortedSignals) {
    if (signal.signal === 'buy' && !inPosition) {
      // Enter position
      inPosition = true;
      entryPrice = signal.price;
      entryDate = new Date(signal.timestamp).toISOString().split('T')[0];
    } else if (signal.signal === 'sell' && inPosition) {
      // Exit position
      const exitPrice = signal.price;
      const exitDate = new Date(signal.timestamp).toISOString().split('T')[0];
      
      const profit = (exitPrice - entryPrice) * positionSize;
      const profitPercent = ((exitPrice - entryPrice) / entryPrice) * 100;
      
      trades.push({
        entryDate,
        exitDate,
        entryPrice,
        exitPrice,
        profit,
        profitPercent,
      });
      
      capital += profit;
      maxCapital = Math.max(maxCapital, capital);
      
      const drawdown = (maxCapital - capital) / maxCapital;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
      
      inPosition = false;
    }
  }
  
  const winningTrades = trades.filter(t => t.profit > 0);
  const losingTrades = trades.filter(t => t.profit <= 0);
  const totalReturn = ((capital - initialCapital) / initialCapital) * 100;
  const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;
  
  // Calculate Sharpe Ratio (simplified)
  const returns = trades.map(t => t.profitPercent);
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / (returns.length || 1);
  const stdDev = Math.sqrt(
    returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length || 1)
  );
  const sharpeRatio = stdDev !== 0 ? avgReturn / stdDev : 0;
  
  return {
    algorithm: signals[0]?.algorithm || 'Unknown',
    totalTrades: trades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    winRate,
    totalReturn,
    maxDrawdown: maxDrawdown * 100,
    sharpeRatio,
    trades,
  };
}

/**
 * Compare multiple strategies
 */
export function compareStrategies(
  data: PriceData[],
  strategies: { name: string; signals: ExitSignal[] }[]
): BacktestResult[] {
  return strategies.map(strategy => {
    const result = backtestStrategy(data, strategy.signals);
    return {
      ...result,
      algorithm: strategy.name,
    };
  });
}
