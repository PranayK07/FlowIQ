// Analytics Types for FlowIQ

export interface PageView {
  id: string;
  siteId: string;
  sessionId: string;
  userId?: string;
  path: string;
  referrer: string;
  timestamp: number;
  duration?: number;
  exitPage: boolean;
}

export interface UserSession {
  id: string;
  siteId: string;
  userId?: string;
  startTime: number;
  endTime?: number;
  pages: string[];
  events: AnalyticsEvent[];
  device: DeviceInfo;
  location: LocationInfo;
}

export interface AnalyticsEvent {
  id: string;
  sessionId: string;
  type: 'click' | 'form_submit' | 'form_error' | 'scroll' | 'exit' | 'custom';
  target: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface DeviceInfo {
  browser: string;
  os: string;
  device: 'mobile' | 'tablet' | 'desktop';
  screenResolution: string;
}

export interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone: string;
}

export interface SiteMetrics {
  siteId: string;
  totalUsers: number;
  conversionRate: number;
  dropOffRate: number;
  clickThroughRate: number;
  avgSessionDuration: number;
  bounceRate: number;
  timeRange: {
    start: number;
    end: number;
  };
  trend: {
    totalUsers: number;
    conversionRate: number;
    dropOffRate: number;
    clickThroughRate: number;
  };
}

export interface UserFlowData {
  from: string;
  to: string;
  users: number;
  dropOff: number;
}

export interface DropOffPage {
  page: string;
  rate: number;
  users: number;
  avgTimeOnPage: number;
  exitReasons: string[];
}

export interface FrictionInsight {
  type: 'slow_load' | 'form_error' | 'navigation_issue' | 'broken_link';
  page: string;
  severity: 'low' | 'medium' | 'high';
  affectedUsers: number;
  description: string;
  recommendation: string;
}

export interface ConversionFunnel {
  steps: {
    name: string;
    page: string;
    users: number;
    conversionRate: number;
    dropOffRate: number;
  }[];
}

export interface MonthlyUserStats {
  month: string;
  year: number;
  totalUsers: number;
  newUsers: number;
  returningUsers: number;
  avgSessionsPerUser: number;
  avgSessionDuration: number;
}

export interface AnalyticsDashboardData {
  metrics: SiteMetrics;
  userFlow: UserFlowData[];
  dropOffPages: DropOffPage[];
  frictionInsights: FrictionInsight[];
  conversionFunnel: ConversionFunnel;
  monthlyStats: MonthlyUserStats[];
}
