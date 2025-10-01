import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  Download, 
  Users, 
  LineChart, 
  MousePointer, 
  Clock, 
  ShieldCheck,
  Filter,
  GitBranch,
  Eye,
  Target,
  Layers,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Features = () => {
  const coreFeatures = [
    {
      icon: BarChart3,
      title: "Visual User Flows",
      description: "Transform raw event data into beautiful, interactive flow diagrams that show exactly how users navigate your site.",
      benefits: [
        "Interactive journey maps with drag-and-pan navigation",
        "Color-coded paths highlighting traffic intensity",
        "Real-time flow updates as new data arrives",
        "Custom time range selection (hour, day, week, month)"
      ]
    },
    {
      icon: AlertCircle,
      title: "Drop-off Detection",
      description: "Automatically identify pages and steps where users abandon their journey, with detailed analytics on why they leave.",
      benefits: [
        "Instant alerts for pages with >50% exit rates",
        "Comparison view showing drop-off trends over time",
        "Segment analysis by traffic source, device, or user type",
        "AI-powered exit reason predictions"
      ]
    },
    {
      icon: TrendingUp,
      title: "Conversion Funnel Analysis",
      description: "Track user progression through key conversion paths and identify optimization opportunities at each step.",
      benefits: [
        "Multi-step funnel visualization with conversion rates",
        "A/B test impact on funnel performance",
        "Goal tracking for purchases, sign-ups, downloads",
        "Benchmark comparisons against industry standards"
      ]
    },
    {
      icon: Zap,
      title: "Friction Insights",
      description: "Detect technical and UX issues that create friction—slow loads, form errors, broken links, and confusing navigation.",
      benefits: [
        "Automated detection of page load issues (>3s)",
        "Form abandonment tracking with field-level insights",
        "Broken link and 404 error monitoring",
        "Rage click detection on non-interactive elements"
      ]
    },
    {
      icon: Download,
      title: "Export & Share Reports",
      description: "Generate comprehensive reports in CSV or PDF format to share insights with your team or stakeholders.",
      benefits: [
        "One-click report generation with custom branding",
        "Scheduled email reports (daily/weekly/monthly)",
        "Team collaboration with comment threads",
        "API access for custom integrations"
      ]
    },
    {
      icon: Users,
      title: "User Segmentation",
      description: "Group users by behavior, demographics, or custom attributes to understand different audience patterns.",
      benefits: [
        "Pre-built segments (new vs returning, high-value, etc.)",
        "Custom segment builder with advanced filters",
        "Cohort analysis to track user retention",
        "Segment-specific flow visualizations"
      ]
    }
  ];

  const technicalFeatures = [
    {
      icon: MousePointer,
      title: "Event Tracking",
      description: "Automatic and custom event capture"
    },
    {
      icon: Clock,
      title: "Real-Time Analytics",
      description: "Live data processing and updates"
    },
    {
      icon: ShieldCheck,
      title: "GDPR & CCPA Compliant",
      description: "Privacy-first data collection"
    },
    {
      icon: Filter,
      title: "Advanced Filters",
      description: "Drill down with multi-criteria filtering"
    },
    {
      icon: GitBranch,
      title: "Session Recording",
      description: "Watch replays of user sessions (Pro+)"
    },
    {
      icon: Eye,
      title: "Heatmaps",
      description: "Click and scroll heatmaps (Pro+)"
    }
  ];

  const useCases = [
    {
      industry: "E-commerce",
      icon: Target,
      description: "Optimize your checkout flow and reduce cart abandonment",
      examples: [
        "Identify which product pages lead to most conversions",
        "Detect friction in payment and shipping steps",
        "Track user behavior from ad clicks to purchase",
        "Understand return customer journey differences"
      ]
    },
    {
      industry: "SaaS & Apps",
      icon: Layers,
      description: "Improve onboarding flows and feature adoption",
      examples: [
        "Map user paths from sign-up to activation",
        "Find where trial users drop off before converting",
        "Monitor feature usage across user segments",
        "Optimize in-app upgrade prompts"
      ]
    },
    {
      industry: "Content & Media",
      icon: Globe,
      description: "Maximize engagement and content discovery",
      examples: [
        "See which articles drive the most time-on-site",
        "Identify navigation patterns for better content layout",
        "Track subscription conversion journeys",
        "Analyze referral traffic behavior"
      ]
    }
  ];

  const integrations = [
    "Google Analytics",
    "Mixpanel",
    "Segment",
    "Amplitude",
    "Google Tag Manager",
    "Shopify",
    "WordPress",
    "HubSpot",
    "Salesforce",
    "Stripe"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FlowIQ
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Button variant="ghost">Pricing</Button>
              <Link to="/dashboard">
                <Button variant="outline">View Demo</Button>
              </Link>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Start Free Trial
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Complete Feature Overview
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Every Tool You Need to
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Understand User Behavior
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              FlowIQ combines powerful analytics, visualization, and automation to help you make data-driven decisions that boost conversions and revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand and optimize your user experience
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with developers and power users in mind
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalFeatures.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Your Industry
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-world applications across different business types
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.industry} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <useCase.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{useCase.industry}</CardTitle>
                  <CardDescription className="text-base">{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {useCase.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect FlowIQ with your existing tools and platforms
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {integrations.map((integration) => (
                <div
                  key={integration}
                  className="bg-card rounded-lg p-4 text-center border hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium text-sm">{integration}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Plus custom integrations via our REST API and webhooks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              See FlowIQ in Action
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Try our interactive demo or start your free trial—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  View Live Demo
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-primary-foreground border-primary-foreground/20 hover:bg-white/20">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                FlowIQ
              </div>
              <p className="text-sm text-muted-foreground">
                Understand user behavior, optimize conversions, grow revenue.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 FlowIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
