// Trading data types
export interface PriceData {
  timestamp: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface ExitSignal {
  timestamp: number;
  price: number;
  algorithm: string;
  signal: 'buy' | 'sell' | 'hold';
  confidence: number;
  reason?: string;
}

export interface BacktestResult {
  algorithm: string;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: Trade[];
}

export interface Trade {
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  profitPercent: number;
}

export interface AlgorithmConfig {
  name: string;
  enabled: boolean;
  parameters: Record<string, number>;
}

export type Algorithm = 'rsi' | 'trend' | 'movingAverage' | 'bollinger' | 'macd';
