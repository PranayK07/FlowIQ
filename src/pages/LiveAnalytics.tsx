import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ArrowDownRight, Users, MousePointerClick, TrendingUp, AlertTriangle, Globe, Loader2, BarChart3, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { analyzeLiveWebsite, WebsiteAnalysisResult } from "@/services/websiteAnalyzer";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LiveAnalytics = () => {
  const [url, setUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<WebsiteAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeLiveWebsite(url);
      setAnalysisResult(result);
    } catch (err) {
      setError("Failed to analyze website. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-primary">
                FlowIQ
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="ghost">Demo Dashboard</Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline">Features</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Live Website Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Analyze Any Website Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Enter any website URL to get comprehensive analytics, user flow insights, and performance metrics in seconds.
            </p>

            {/* Input Section */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter website URL (e.g., example.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-10 h-12 text-lg"
                        disabled={loading}
                      />
                    </div>
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={loading}
                      size="lg"
                      className="h-12 px-8"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-sm text-destructive text-left">{error}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="text-left">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">User Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get insights into user behavior, traffic patterns, and conversion metrics.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">User Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Visualize how users navigate through pages and identify drop-off points.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Friction Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Discover UX issues and get actionable recommendations to improve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render full analytics dashboard
  const { dashboard, pageStructure, performance } = analysisResult;
  const { metrics: siteMetrics, userFlow, dropOffPages, frictionInsights, conversionFunnel, monthlyStats } = dashboard;

  const metrics = [
    {
      title: "Total Users",
      value: siteMetrics.totalUsers.toLocaleString(),
      change: `${siteMetrics.trend.totalUsers > 0 ? '+' : ''}${siteMetrics.trend.totalUsers.toFixed(1)}%`,
      trend: siteMetrics.trend.totalUsers > 0 ? "up" : "down",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: `${siteMetrics.conversionRate.toFixed(2)}%`,
      change: `${siteMetrics.trend.conversionRate > 0 ? '+' : ''}${siteMetrics.trend.conversionRate.toFixed(1)}%`,
      trend: siteMetrics.trend.conversionRate > 0 ? "up" : "down",
      icon: TrendingUp,
    },
    {
      title: "Drop-off Rate",
      value: `${siteMetrics.dropOffRate.toFixed(1)}%`,
      change: `${siteMetrics.trend.dropOffRate.toFixed(1)}%`,
      trend: siteMetrics.trend.dropOffRate < 0 ? "down" : "up",
      icon: AlertTriangle,
    },
    {
      title: "Click Through",
      value: `${siteMetrics.clickThroughRate.toFixed(1)}%`,
      change: `${siteMetrics.trend.clickThroughRate > 0 ? '+' : ''}${siteMetrics.trend.clickThroughRate.toFixed(1)}%`,
      trend: siteMetrics.trend.clickThroughRate > 0 ? "up" : "down",
      icon: MousePointerClick,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              FlowIQ
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setAnalysisResult(null)}>
                Analyze Another Site
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header with Website Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">{analysisResult.title}</h1>
          </div>
          <p className="text-muted-foreground">{analysisResult.url}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Analyzed on {new Date(analysisResult.analyzedAt).toLocaleString()}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className="flex items-center text-sm">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-warning mr-1" />
                  )}
                  <span className={metric.trend === "up" ? "text-success" : "text-warning"}>
                    {metric.change}
                  </span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Load Time</span>
                  <span className={`text-sm font-bold ${performance.loadTime > 3 ? 'text-warning' : 'text-success'}`}>
                    {performance.loadTime.toFixed(2)}s
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${performance.loadTime > 3 ? 'bg-warning' : 'bg-success'}`}
                    style={{ width: `${Math.min((performance.loadTime / 5) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Page Size</span>
                  <span className="text-sm font-bold">{performance.pageSize.toFixed(0)} KB</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${Math.min((performance.pageSize / 3000) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">HTTP Requests</span>
                  <span className="font-medium">{performance.requests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Scripts</span>
                  <span className="font-medium">{performance.scripts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Images</span>
                  <span className="font-medium">{performance.images}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Site Structure</CardTitle>
              <CardDescription>Website architecture analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Pages</span>
                <span className="text-2xl font-bold">{pageStructure.totalPages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Navigation Items</span>
                <span className="text-2xl font-bold">{pageStructure.navigation.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Forms</span>
                <span className="text-2xl font-bold">{pageStructure.forms}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">CTA Buttons</span>
                <span className="text-2xl font-bold">{pageStructure.ctaButtons}</span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>User engagement statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Avg. Session Duration</div>
                <div className="text-2xl font-bold">{Math.floor(siteMetrics.avgSessionDuration / 60)}m {Math.floor(siteMetrics.avgSessionDuration % 60)}s</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Bounce Rate</div>
                <div className="text-2xl font-bold">{siteMetrics.bounceRate.toFixed(1)}%</div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-warning"
                  style={{ width: `${siteMetrics.bounceRate}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Stats Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Growth Trends</CardTitle>
            <CardDescription>Monthly user statistics over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalUsers" stroke="#8884d8" name="Total Users" strokeWidth={2} />
                <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" name="New Users" strokeWidth={2} />
                <Line type="monotone" dataKey="returningUsers" stroke="#ffc658" name="Returning Users" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey through key pages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnel.steps}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" name="Users" />
                <Bar dataKey="conversionRate" fill="#82ca9d" name="Conversion Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Flow Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>User Flow Analysis</CardTitle>
              <CardDescription>Track how users navigate through pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userFlow.map((flow, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="font-medium">{flow.from}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{flow.users.toLocaleString()} users</span>
                          </div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${100 - flow.dropOff}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{flow.to}</span>
                          <span className={`text-xs font-medium ${flow.dropOff > 50 ? 'text-warning' : 'text-muted-foreground'}`}>
                            {flow.dropOff}% drop-off
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Drop-off Pages */}
          <Card>
            <CardHeader>
              <CardTitle>High Drop-off Pages</CardTitle>
              <CardDescription>Pages where users exit most frequently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dropOffPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{page.page}</span>
                        <span className="text-sm text-warning font-semibold">{page.rate.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-warning transition-all"
                          style={{ width: `${page.rate}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{page.users.toLocaleString()} users affected</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Friction Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Friction Insights & Recommendations</CardTitle>
            <CardDescription>Common issues affecting user experience with actionable advice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {frictionInsights.map((insight, index) => (
                <div key={index} className={`flex items-start gap-3 p-4 rounded-lg border ${
                  insight.severity === 'high' ? 'bg-destructive/10 border-destructive/20' :
                  insight.severity === 'medium' ? 'bg-warning/10 border-warning/20' :
                  'bg-muted/50 border-muted'
                }`}>
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    insight.severity === 'high' ? 'text-destructive' :
                    insight.severity === 'medium' ? 'text-warning' :
                    'text-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{insight.description}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        insight.severity === 'high' ? 'bg-destructive/20 text-destructive' :
                        insight.severity === 'medium' ? 'bg-warning/20 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {insight.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{insight.recommendation}</p>
                    <p className="text-xs text-muted-foreground">Affects ~{insight.affectedUsers.toLocaleString()} users</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveAnalytics;
