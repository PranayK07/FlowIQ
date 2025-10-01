import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Users, MousePointerClick, TrendingUp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const metrics = [
    {
      title: "Total Users",
      value: "12,459",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Drop-off Rate",
      value: "45.2%",
      change: "-5.3%",
      trend: "down",
      icon: AlertTriangle,
    },
    {
      title: "Click Through",
      value: "68.9%",
      change: "+3.2%",
      trend: "up",
      icon: MousePointerClick,
    },
  ];

  const topDropOffPages = [
    { page: "/checkout", rate: 62.3, users: 3421 },
    { page: "/signup", rate: 54.8, users: 2876 },
    { page: "/pricing", rate: 48.2, users: 2104 },
    { page: "/product-details", rate: 42.1, users: 1893 },
  ];

  const userFlow = [
    { from: "Landing Page", to: "Product Page", users: 8234, dropOff: 18 },
    { from: "Product Page", to: "Pricing", users: 6752, dropOff: 24 },
    { from: "Pricing", to: "Signup", users: 5132, dropOff: 32 },
    { from: "Signup", to: "Checkout", users: 3489, dropOff: 45 },
    { from: "Checkout", to: "Success", users: 1315, dropOff: 62 },
  ];

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
              <Button variant="ghost">Documentation</Button>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track user behavior and identify friction points</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Flow Visualization */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>User Flow Analysis</CardTitle>
              <CardDescription>Track how users navigate through your funnel</CardDescription>
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
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all"
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
                {topDropOffPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{page.page}</span>
                        <span className="text-sm text-warning font-semibold">{page.rate}%</span>
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

          {/* Friction Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Friction Insights</CardTitle>
              <CardDescription>Common issues affecting user experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Slow checkout page load</p>
                    <p className="text-xs text-muted-foreground">Avg. 4.2s load time causing 23% abandonment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Form validation errors</p>
                    <p className="text-xs text-muted-foreground">18% of users encounter errors on signup form</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Mobile navigation issues</p>
                    <p className="text-xs text-muted-foreground">Mobile users 2x more likely to exit pricing page</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
