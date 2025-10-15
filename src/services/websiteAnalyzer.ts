// Website Analyzer Service - Analyzes live websites for analytics insights
import {
  AnalyticsDashboardData,
  SiteMetrics,
  UserFlowData,
  DropOffPage,
  FrictionInsight,
  ConversionFunnel,
  MonthlyUserStats
} from '@/types/analytics';

export interface WebsiteAnalysisResult {
  url: string;
  title: string;
  description?: string;
  analyzedAt: number;
  dashboard: AnalyticsDashboardData;
  pageStructure: PageStructure;
  performance: PerformanceMetrics;
}

export interface PageStructure {
  totalPages: number;
  mainPages: string[];
  navigation: NavigationStructure[];
  forms: number;
  ctaButtons: number;
}

export interface NavigationStructure {
  label: string;
  href: string;
  depth: number;
}

export interface PerformanceMetrics {
  loadTime: number;
  pageSize: number;
  requests: number;
  scripts: number;
  images: number;
}

// Simulate fetching and analyzing a live website
export async function analyzeLiveWebsite(url: string): Promise<WebsiteAnalysisResult> {
  // Normalize URL
  const normalizedUrl = normalizeUrl(url);
  
  // Simulate network delay
  await delay(1500);
  
  // Extract domain for site ID
  const siteId = extractDomain(normalizedUrl);
  
  // Simulate fetching website metadata
  const metadata = await fetchWebsiteMetadata(normalizedUrl);
  
  // Simulate analyzing page structure
  const pageStructure = await analyzePageStructure(normalizedUrl);
  
  // Simulate performance metrics
  const performance = await analyzePerformance(normalizedUrl);
  
  // Generate analytics dashboard based on the website structure
  const dashboard = generateAnalyticsFromStructure(siteId, pageStructure, performance);
  
  return {
    url: normalizedUrl,
    title: metadata.title,
    description: metadata.description,
    analyzedAt: Date.now(),
    dashboard,
    pageStructure,
    performance
  };
}

// Helper function to normalize URLs
function normalizeUrl(url: string): string {
  // Add https:// if no protocol specified
  if (!url.match(/^https?:\/\//)) {
    url = 'https://' + url;
  }
  
  // Remove trailing slash
  url = url.replace(/\/$/, '');
  
  return url;
}

// Extract domain from URL
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return 'unknown-site';
  }
}

// Simulate fetching website metadata
async function fetchWebsiteMetadata(url: string): Promise<{ title: string; description?: string }> {
  await delay(300);
  
  const domain = extractDomain(url);
  
  // Return simulated metadata based on common patterns
  return {
    title: `${domain.split('.')[0].charAt(0).toUpperCase()}${domain.split('.')[0].slice(1)} - Website`,
    description: `Analytics and insights for ${domain}`
  };
}

// Simulate analyzing page structure
async function analyzePageStructure(url: string): Promise<PageStructure> {
  await delay(400);
  
  const domain = extractDomain(url);
  
  // Common website structure patterns
  const commonPages = [
    '/',
    '/about',
    '/products',
    '/services',
    '/pricing',
    '/contact',
    '/blog'
  ];
  
  // Generate navigation based on common patterns
  const navigation: NavigationStructure[] = [
    { label: 'Home', href: '/', depth: 0 },
    { label: 'About', href: '/about', depth: 0 },
    { label: 'Products', href: '/products', depth: 0 },
    { label: 'Services', href: '/services', depth: 0 },
    { label: 'Pricing', href: '/pricing', depth: 0 },
    { label: 'Contact', href: '/contact', depth: 0 }
  ];
  
  return {
    totalPages: Math.floor(Math.random() * 50) + 10,
    mainPages: commonPages,
    navigation,
    forms: Math.floor(Math.random() * 5) + 2,
    ctaButtons: Math.floor(Math.random() * 10) + 5
  };
}

// Simulate performance analysis
async function analyzePerformance(url: string): Promise<PerformanceMetrics> {
  await delay(300);
  
  return {
    loadTime: Math.random() * 3 + 1, // 1-4 seconds
    pageSize: Math.random() * 2000 + 500, // 500-2500 KB
    requests: Math.floor(Math.random() * 50) + 20,
    scripts: Math.floor(Math.random() * 15) + 5,
    images: Math.floor(Math.random() * 30) + 10
  };
}

// Generate analytics dashboard from website structure
function generateAnalyticsFromStructure(
  siteId: string,
  structure: PageStructure,
  performance: PerformanceMetrics
): AnalyticsDashboardData {
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  
  // Generate realistic metrics based on website characteristics
  const baseUsers = Math.floor(Math.random() * 20000) + 5000;
  const conversionRate = Math.random() * 5 + 1; // 1-6%
  
  // Performance impacts metrics
  const performanceImpact = performance.loadTime > 3 ? 0.8 : 1.0;
  const adjustedUsers = Math.floor(baseUsers * performanceImpact);
  
  const metrics: SiteMetrics = {
    siteId,
    totalUsers: adjustedUsers,
    conversionRate: conversionRate * performanceImpact,
    dropOffRate: performance.loadTime > 3 ? Math.random() * 30 + 40 : Math.random() * 20 + 20,
    clickThroughRate: Math.random() * 40 + 30,
    avgSessionDuration: Math.random() * 180 + 60,
    bounceRate: performance.loadTime > 3 ? Math.random() * 30 + 50 : Math.random() * 20 + 30,
    timeRange: { start: thirtyDaysAgo, end: now },
    trend: {
      totalUsers: Math.random() * 20 - 5,
      conversionRate: Math.random() * 2 - 0.5,
      dropOffRate: Math.random() * 10 - 5,
      clickThroughRate: Math.random() * 5 - 2
    }
  };
  
  // Generate user flow from main pages
  const userFlow: UserFlowData[] = structure.mainPages.slice(0, 5).map((page, index) => {
    const nextPage = structure.mainPages[index + 1] || '/contact';
    return {
      from: formatPageName(page),
      to: formatPageName(nextPage),
      users: Math.floor(adjustedUsers * Math.random() * 0.3 + adjustedUsers * 0.1),
      dropOff: Math.floor(Math.random() * 30 + 10)
    };
  }).filter((_, i) => i < structure.mainPages.length - 1);
  
  // Generate drop-off pages
  const dropOffPages: DropOffPage[] = structure.mainPages.slice(0, 4).map(page => ({
    page,
    rate: Math.random() * 40 + 20,
    users: Math.floor(adjustedUsers * Math.random() * 0.2),
    avgTimeOnPage: Math.random() * 120 + 30,
    exitReasons: ['Slow load time', 'Missing information', 'Navigation issues']
  })).sort((a, b) => b.rate - a.rate);
  
  // Generate friction insights based on performance
  const frictionInsights: FrictionInsight[] = [];
  
  if (performance.loadTime > 3) {
    frictionInsights.push({
      type: 'slow_load',
      page: structure.mainPages[0],
      severity: 'high',
      affectedUsers: Math.floor(adjustedUsers * 0.3),
      description: `Slow page load time detected (${performance.loadTime.toFixed(1)}s)`,
      recommendation: `Page loads in ${performance.loadTime.toFixed(1)}s - optimize images (${performance.images} found) and reduce scripts (${performance.scripts} found)`
    });
  }
  
  if (structure.forms > 3) {
    frictionInsights.push({
      type: 'form_error',
      page: '/contact',
      severity: 'medium',
      affectedUsers: Math.floor(adjustedUsers * 0.15),
      description: 'Multiple forms detected',
      recommendation: `${structure.forms} forms found - ensure proper validation and clear error messages`
    });
  }
  
  if (structure.navigation.length > 8) {
    frictionInsights.push({
      type: 'navigation_issue',
      page: '/',
      severity: 'medium',
      affectedUsers: Math.floor(adjustedUsers * 0.2),
      description: 'Complex navigation structure',
      recommendation: `${structure.navigation.length} top-level nav items - consider simplifying menu for better UX`
    });
  }
  
  // Add default insights if none generated
  if (frictionInsights.length === 0) {
    frictionInsights.push({
      type: 'navigation_issue',
      page: structure.mainPages[2] || '/services',
      severity: 'low',
      affectedUsers: Math.floor(adjustedUsers * 0.1),
      description: 'Mobile navigation could be improved',
      recommendation: 'Consider adding a sticky mobile menu for easier navigation'
    });
  }
  
  // Generate conversion funnel
  const funnelPages = structure.mainPages.slice(0, Math.min(6, structure.mainPages.length));
  let previousUsers = adjustedUsers;
  
  const conversionFunnel: ConversionFunnel = {
    steps: funnelPages.map((page, index) => {
      const usersAtStep = index === 0 ? adjustedUsers : Math.floor(previousUsers * (Math.random() * 0.4 + 0.4));
      const convRate = index === 0 ? 100 : (usersAtStep / previousUsers) * 100;
      
      const result = {
        name: formatPageName(page),
        page,
        users: usersAtStep,
        conversionRate: convRate,
        dropOffRate: 100 - convRate
      };
      
      previousUsers = usersAtStep;
      return result;
    })
  };
  
  // Generate monthly stats
  const monthlyStats: MonthlyUserStats[] = generateMonthlyStats(adjustedUsers);
  
  return {
    metrics,
    userFlow,
    dropOffPages,
    frictionInsights,
    conversionFunnel,
    monthlyStats
  };
}

// Format page names for display
function formatPageName(path: string): string {
  const names: Record<string, string> = {
    '/': 'Home',
    '/about': 'About',
    '/products': 'Products',
    '/services': 'Services',
    '/pricing': 'Pricing',
    '/contact': 'Contact',
    '/blog': 'Blog',
    '/signup': 'Sign Up',
    '/checkout': 'Checkout'
  };
  
  return names[path] || path.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || path;
}

// Generate monthly statistics
function generateMonthlyStats(baseUsers: number): MonthlyUserStats[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const stats: MonthlyUserStats[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = monthIndex > currentMonth ? currentYear - 1 : currentYear;
    const growthFactor = 1 + (5 - i) * 0.1; // Growth over time
    
    const totalUsers = Math.floor(baseUsers * 0.2 * growthFactor);
    const newUsers = Math.floor(totalUsers * (Math.random() * 0.3 + 0.4));
    
    stats.push({
      month: months[monthIndex],
      year,
      totalUsers,
      newUsers,
      returningUsers: totalUsers - newUsers,
      avgSessionsPerUser: Math.random() * 2 + 1.5,
      avgSessionDuration: Math.random() * 180 + 120
    });
  }
  
  return stats;
}

// Utility delay function
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  analyzeLiveWebsite
};
