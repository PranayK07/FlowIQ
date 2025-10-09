import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Upload, TrendingUp, TrendingDown, Activity, BarChart3, Download } from 'lucide-react';
import { PriceData, ExitSignal, BacktestResult } from '@/types/trading';
import { generateSampleData, parseCSVData } from '@/utils/dataLoader';
import { computeExitPoints } from '@/utils/exitAlgorithms';
import { backtestStrategy } from '@/utils/backtesting';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const TradingDashboard = () => {
  const { toast } = useToast();
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [exitSignals, setExitSignals] = useState<ExitSignal[]>([]);
  const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('rsi');
  const [threshold, setThreshold] = useState(0.03);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    const sampleData = generateSampleData(180);
    setPriceData(sampleData);
    computeSignals(sampleData, 'rsi', {});
  }, []);

  const computeSignals = (data: PriceData[], algorithm: string, parameters: Record<string, number>) => {
    const signals = computeExitPoints(data, algorithm, parameters);
    setExitSignals(signals);
    
    // Run backtest
    const result = backtestStrategy(data, signals);
    setBacktestResult(result);
  };

  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
    const params = algorithm === 'trend' ? { threshold } : {};
    computeSignals(priceData, algorithm, params);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = parseCSVData(text);
        
        if (data.length === 0) {
          toast({
            title: 'Error',
            description: 'No valid data found in CSV file',
            variant: 'destructive',
          });
          return;
        }
        
        setPriceData(data);
        computeSignals(data, selectedAlgorithm, {});
        
        toast({
          title: 'Success',
          description: `Loaded ${data.length} price points`,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to parse CSV file',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.readAsText(file);
  };

  const handleDownloadSignals = () => {
    const csv = [
      'Date,Price,Algorithm,Signal,Confidence,Reason',
      ...exitSignals.map(s => 
        `${new Date(s.timestamp).toISOString().split('T')[0]},${s.price},${s.algorithm},${s.signal},${s.confidence.toFixed(2)},"${s.reason}"`
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exit-signals-${selectedAlgorithm}.csv`;
    a.click();
  };

  // Prepare chart data
  const chartData = priceData.map(d => ({
    date: new Date(d.timestamp).toLocaleDateString(),
    price: d.close,
    timestamp: d.timestamp,
  }));

  const signalData = exitSignals.map(s => ({
    date: new Date(s.timestamp).toLocaleDateString(),
    price: s.price,
    timestamp: s.timestamp,
    signal: s.signal,
  }));

  const buySignals = signalData.filter(s => s.signal === 'buy');
  const sellSignals = signalData.filter(s => s.signal === 'sell');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FlowIQ
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/features">
                <Button variant="ghost">Features</Button>
              </Link>
              <Link to="/">
                <Button variant="outline">About</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Exit Point Analysis</h1>
          <p className="text-muted-foreground text-lg">
            Compute optimal exit points using advanced algorithms and backtest your strategies
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Select algorithm and upload data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Algorithm</Label>
                <Select value={selectedAlgorithm} onValueChange={handleAlgorithmChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rsi">RSI (Relative Strength Index)</SelectItem>
                    <SelectItem value="movingaverage">Moving Average Crossover</SelectItem>
                    <SelectItem value="trend">Trend Analysis</SelectItem>
                    <SelectItem value="bollinger">Bollinger Bands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedAlgorithm === 'trend' && (
                <div className="space-y-2">
                  <Label>Threshold (%)</Label>
                  <Input
                    type="number"
                    value={threshold * 100}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) / 100;
                      setThreshold(val);
                      computeSignals(priceData, selectedAlgorithm, { threshold: val });
                    }}
                    step="0.1"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Data Source</Label>
                <div className="flex gap-2">
                  <label className="flex-1">
                    <Button variant="outline" className="w-full" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload CSV
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <Button variant="outline" onClick={handleDownloadSignals}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics */}
        {backtestResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Return</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  {backtestResult.totalReturn > 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  {backtestResult.totalReturn.toFixed(2)}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  <Activity className="h-5 w-5 text-blue-500 mr-2" />
                  {backtestResult.winRate.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {backtestResult.winningTrades}/{backtestResult.totalTrades} trades
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Max Drawdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  <TrendingDown className="h-5 w-5 text-orange-500 mr-2" />
                  {backtestResult.maxDrawdown.toFixed(2)}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Sharpe Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  <BarChart3 className="h-5 w-5 text-purple-500 mr-2" />
                  {backtestResult.sharpeRatio.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chart">Price Chart</TabsTrigger>
            <TabsTrigger value="signals">Exit Signals ({exitSignals.length})</TabsTrigger>
            <TabsTrigger value="backtest">Backtest Results</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Price Chart with Exit Signals</CardTitle>
                <CardDescription>
                  Green markers = Buy signals, Red markers = Sell signals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        interval={Math.floor(chartData.length / 10)}
                      />
                      <YAxis domain={['auto', 'auto']} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={false}
                        name="Close Price"
                      />
                      {buySignals.map((signal, idx) => (
                        <Scatter
                          key={`buy-${idx}`}
                          data={[signal]}
                          fill="#22c55e"
                          shape="circle"
                        />
                      ))}
                      {sellSignals.map((signal, idx) => (
                        <Scatter
                          key={`sell-${idx}`}
                          data={[signal]}
                          fill="#ef4444"
                          shape="circle"
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exit Signals</CardTitle>
                <CardDescription>All detected entry and exit points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {exitSignals.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No signals detected with current parameters
                    </p>
                  ) : (
                    exitSignals.map((signal, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          signal.signal === 'buy'
                            ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900'
                            : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">
                              {signal.signal.toUpperCase()}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(signal.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm">{signal.reason}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${signal.price.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">
                            {(signal.confidence * 100).toFixed(0)}% confidence
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backtest" className="space-y-4">
            {backtestResult && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Strategy Performance</CardTitle>
                    <CardDescription>Historical backtest results for {backtestResult.algorithm}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Trades</p>
                        <p className="text-2xl font-bold">{backtestResult.totalTrades}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Winning Trades</p>
                        <p className="text-2xl font-bold text-green-600">{backtestResult.winningTrades}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Losing Trades</p>
                        <p className="text-2xl font-bold text-red-600">{backtestResult.losingTrades}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                        <p className="text-2xl font-bold">{backtestResult.winRate.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trade History</CardTitle>
                    <CardDescription>Detailed list of all trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {backtestResult.trades.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No completed trades
                        </p>
                      ) : (
                        backtestResult.trades.map((trade, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border ${
                              trade.profit > 0
                                ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900'
                                : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  {trade.entryDate} → {trade.exitDate}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Entry: ${trade.entryPrice.toFixed(2)} | Exit: ${trade.exitPrice.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className={`font-bold ${trade.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {trade.profitPercent > 0 ? '+' : ''}{trade.profitPercent.toFixed(2)}%
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  ${trade.profit.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TradingDashboard;
