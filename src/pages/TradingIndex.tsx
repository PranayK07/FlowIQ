import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Activity, Upload, Download, Target, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const TradingIndex = () => {
  const features = [
    {
      icon: Target,
      title: "Multiple Exit Algorithms",
      description: "RSI, Moving Average, Trend Analysis, Bollinger Bands, and MACD strategies",
    },
    {
      icon: LineChart,
      title: "Interactive Visualizations",
      description: "Beautiful price charts with annotated entry and exit signals",
    },
    {
      icon: Activity,
      title: "Historical Backtesting",
      description: "Test strategies on historical data with comprehensive performance metrics",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Win rate, Sharpe ratio, max drawdown, and total return calculations",
    },
    {
      icon: Upload,
      title: "Flexible Data Sources",
      description: "Upload CSV files, connect to APIs, or use sample data",
    },
    {
      icon: Download,
      title: "Export Results",
      description: "Download exit signals and backtest reports as CSV files",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              FlowIQ
            </div>
            <div className="flex items-center gap-4">
              <Link to="/features">
                <Button variant="ghost">Features</Button>
              </Link>
              <Link to="/trading">
                <Button className="bg-primary hover:bg-primary/90">
                  Launch App
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-sm font-medium text-accent">🚀 Data-Driven Exit Strategies</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Master Your Exit Points
              <br />
              <span className="text-primary">
                With Algorithmic Precision
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              FlowIQ helps you determine optimal exit points in trading strategies using multiple algorithms,
              comprehensive backtesting, and beautiful visualizations.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/trading">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try it Now - Free
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Exit Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you make informed exit decisions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How FlowIQ Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to optimize your exit strategy
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Load Your Data</h3>
                <p className="text-muted-foreground text-lg">
                  Upload CSV files with historical price data, connect to market APIs, or use our sample
                  data to explore the platform. FlowIQ supports standard OHLCV (Open, High, Low, Close, Volume) format.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Choose Your Algorithm</h3>
                <p className="text-muted-foreground text-lg">
                  Select from RSI, Moving Average Crossover, Trend Analysis, Bollinger Bands, or MACD strategies.
                  Each algorithm can be fine-tuned with custom parameters to match your trading style.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Analyze & Optimize</h3>
                <p className="text-muted-foreground text-lg">
                  View interactive charts with exit signals, run comprehensive backtests to evaluate performance,
                  and export your results. Compare multiple strategies to find what works best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              Ready to Optimize Your Exits?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Start using FlowIQ today - no signup required for the demo
            </p>
            <Link to="/trading">
              <Button size="lg" variant="secondary" className="font-semibold">
                Launch Trading Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-primary mb-4">
                FlowIQ
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced exit point analysis for trading strategies
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
                <li><Link to="/trading" className="hover:text-foreground">Dashboard</Link></li>
                <li><a href="#" className="hover:text-foreground">Algorithms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground">Examples</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/PranayK07/FlowIQ" className="hover:text-foreground">GitHub</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 FlowIQ. Open source under MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TradingIndex;
