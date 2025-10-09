// Analytics Service - Simulates backend analytics processing
import {
  AnalyticsDashboardData,
  SiteMetrics,
  UserFlowData,
  DropOffPage,
  FrictionInsight,
  ConversionFunnel,
  MonthlyUserStats,
  PageView,
  UserSession,
  AnalyticsEvent
} from '@/types/analytics';

// In-memory storage for demo purposes
class AnalyticsStore {
  private pageViews: Map<string, PageView[]> = new Map();
  private sessions: Map<string, UserSession[]> = new Map();
  private events: Map<string, AnalyticsEvent[]> = new Map();

  addPageView(siteId: string, pageView: PageView) {
    if (!this.pageViews.has(siteId)) {
      this.pageViews.set(siteId, []);
    }
    this.pageViews.get(siteId)!.push(pageView);
  }

  addSession(siteId: string, session: UserSession) {
    if (!this.sessions.has(siteId)) {
      this.sessions.set(siteId, []);
    }
    this.sessions.get(siteId)!.push(session);
  }

  addEvent(siteId: string, event: AnalyticsEvent) {
    if (!this.events.has(siteId)) {
      this.events.set(siteId, []);
    }
    this.events.get(siteId)!.push(event);
  }

  getPageViews(siteId: string): PageView[] {
    return this.pageViews.get(siteId) || [];
  }

  getSessions(siteId: string): UserSession[] {
    return this.sessions.get(siteId) || [];
  }

  getEvents(siteId: string): AnalyticsEvent[] {
    return this.events.get(siteId) || [];
  }

  clear(siteId: string) {
    this.pageViews.delete(siteId);
    this.sessions.delete(siteId);
    this.events.delete(siteId);
  }
}

const store = new AnalyticsStore();

// Generate demo data for a site
export function generateDemoData(siteId: string = 'demo'): void {
  store.clear(siteId);

  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  // Generate sample sessions and page views
  const pages = ['/', '/product', '/pricing', '/signup', '/checkout', '/success'];
  const sessions = 15000;

  for (let i = 0; i < sessions; i++) {
    const sessionId = `session-${i}`;
    const sessionStart = thirtyDaysAgo + Math.random() * (now - thirtyDaysAgo);
    const userId = Math.random() > 0.3 ? `user-${Math.floor(Math.random() * 8000)}` : undefined;
    
    // Simulate user journey
    const numPages = Math.min(Math.floor(Math.random() * 6) + 1, pages.length);
    const sessionPages: string[] = [];
    const sessionEvents: AnalyticsEvent[] = [];

    for (let j = 0; j < numPages; j++) {
      const page = pages[j];
      sessionPages.push(page);

      const pageView: PageView = {
        id: `pv-${i}-${j}`,
        siteId,
        sessionId,
        userId,
        path: page,
        referrer: j === 0 ? (Math.random() > 0.5 ? 'google' : 'direct') : pages[j - 1],
        timestamp: sessionStart + j * 60000,
        duration: Math.random() * 120000,
        exitPage: j === numPages - 1 && Math.random() > 0.15
      };

      store.addPageView(siteId, pageView);

      // Generate events for this page
      const numEvents = Math.floor(Math.random() * 5);
      for (let k = 0; k < numEvents; k++) {
        const event: AnalyticsEvent = {
          id: `evt-${i}-${j}-${k}`,
          sessionId,
          type: ['click', 'scroll', 'form_submit'][Math.floor(Math.random() * 3)] as any,
          target: `element-${k}`,
          timestamp: pageView.timestamp + Math.random() * (pageView.duration || 60000),
          metadata: {}
        };
        sessionEvents.push(event);
        store.addEvent(siteId, event);
      }
    }

    const session: UserSession = {
      id: sessionId,
      siteId,
      userId,
      startTime: sessionStart,
      endTime: sessionStart + numPages * 60000,
      pages: sessionPages,
      events: sessionEvents,
      device: {
        browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
        os: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'][Math.floor(Math.random() * 5)],
        device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)] as any,
        screenResolution: '1920x1080'
      },
      location: {
        country: ['US', 'UK', 'CA', 'AU', 'DE'][Math.floor(Math.random() * 5)],
        timezone: 'UTC'
      }
    };

    store.addSession(siteId, session);
  }
}

// Calculate metrics from stored data
export function calculateMetrics(siteId: string, timeRange?: { start: number; end: number }): SiteMetrics {
  const sessions = store.getSessions(siteId);
  const pageViews = store.getPageViews(siteId);

  if (sessions.length === 0) {
    generateDemoData(siteId);
    return calculateMetrics(siteId, timeRange);
  }

  const filteredSessions = timeRange
    ? sessions.filter(s => s.startTime >= timeRange.start && s.startTime <= timeRange.end)
    : sessions;

  const totalUsers = new Set(filteredSessions.map(s => s.userId || s.id)).size;
  const conversions = filteredSessions.filter(s => s.pages.includes('/success')).length;
  const conversionRate = (conversions / filteredSessions.length) * 100;

  const exits = pageViews.filter(pv => pv.exitPage);
  const dropOffRate = (exits.length / pageViews.length) * 100;

  const clicks = store.getEvents(siteId).filter(e => e.type === 'click');
  const clickThroughRate = (clicks.length / pageViews.length) * 100;

  const avgSessionDuration = filteredSessions.reduce((sum, s) => {
    return sum + ((s.endTime || s.startTime) - s.startTime);
  }, 0) / filteredSessions.length;

  const bounceRate = filteredSessions.filter(s => s.pages.length === 1).length / filteredSessions.length * 100;

  return {
    siteId,
    totalUsers,
    conversionRate,
    dropOffRate,
    clickThroughRate,
    avgSessionDuration: avgSessionDuration / 1000, // Convert to seconds
    bounceRate,
    timeRange: timeRange || { start: Date.now() - 30 * 24 * 60 * 60 * 1000, end: Date.now() },
    trend: {
      totalUsers: 12.5,
      conversionRate: 0.8,
      dropOffRate: -5.3,
      clickThroughRate: 3.2
    }
  };
}

export function calculateUserFlow(siteId: string): UserFlowData[] {
  const sessions = store.getSessions(siteId);
  
  const flowMap = new Map<string, { users: number; dropOffs: number }>();

  sessions.forEach(session => {
    for (let i = 0; i < session.pages.length - 1; i++) {
      const from = session.pages[i];
      const to = session.pages[i + 1];
      const key = `${from}|${to}`;

      if (!flowMap.has(key)) {
        flowMap.set(key, { users: 0, dropOffs: 0 });
      }
      flowMap.get(key)!.users++;
    }

    // Count drop-offs
    if (session.pages.length > 0) {
      const lastPage = session.pages[session.pages.length - 1];
      const pageViews = store.getPageViews(siteId).filter(pv => 
        pv.sessionId === session.id && pv.path === lastPage && pv.exitPage
      );
      
      if (pageViews.length > 0 && session.pages.length > 1) {
        const prevPage = session.pages[session.pages.length - 2];
        const key = `${prevPage}|${lastPage}`;
        if (flowMap.has(key)) {
          flowMap.get(key)!.dropOffs++;
        }
      }
    }
  });

  const pageNames: Record<string, string> = {
    '/': 'Landing Page',
    '/product': 'Product Page',
    '/pricing': 'Pricing',
    '/signup': 'Signup',
    '/checkout': 'Checkout',
    '/success': 'Success'
  };

  return Array.from(flowMap.entries()).map(([key, data]) => {
    const [from, to] = key.split('|');
    return {
      from: pageNames[from] || from,
      to: pageNames[to] || to,
      users: data.users,
      dropOff: Math.round((data.dropOffs / data.users) * 100)
    };
  }).sort((a, b) => b.users - a.users).slice(0, 5);
}

export function calculateDropOffPages(siteId: string): DropOffPage[] {
  const pageViews = store.getPageViews(siteId);
  
  const pageStats = new Map<string, { total: number; exits: number; totalTime: number }>();

  pageViews.forEach(pv => {
    if (!pageStats.has(pv.path)) {
      pageStats.set(pv.path, { total: 0, exits: 0, totalTime: 0 });
    }
    const stats = pageStats.get(pv.path)!;
    stats.total++;
    if (pv.exitPage) stats.exits++;
    stats.totalTime += pv.duration || 0;
  });

  return Array.from(pageStats.entries())
    .map(([page, stats]) => ({
      page,
      rate: (stats.exits / stats.total) * 100,
      users: stats.exits,
      avgTimeOnPage: stats.totalTime / stats.total / 1000,
      exitReasons: ['Slow load time', 'Confusing navigation', 'Missing information']
    }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 4);
}

export function calculateFrictionInsights(siteId: string): FrictionInsight[] {
  const pageViews = store.getPageViews(siteId);

  return [
    {
      type: 'slow_load',
      page: '/checkout',
      severity: 'high',
      affectedUsers: Math.floor(pageViews.filter(pv => pv.path === '/checkout').length * 0.23),
      description: 'Slow checkout page load',
      recommendation: 'Avg. 4.2s load time causing 23% abandonment - optimize images and reduce JavaScript bundle size'
    },
    {
      type: 'form_error',
      page: '/signup',
      severity: 'medium',
      affectedUsers: Math.floor(pageViews.filter(pv => pv.path === '/signup').length * 0.18),
      description: 'Form validation errors',
      recommendation: '18% of users encounter errors on signup form - improve validation messages and field hints'
    },
    {
      type: 'navigation_issue',
      page: '/pricing',
      severity: 'medium',
      affectedUsers: Math.floor(pageViews.filter(pv => pv.path === '/pricing').length * 0.15),
      description: 'Mobile navigation issues',
      recommendation: 'Mobile users 2x more likely to exit pricing page - improve mobile menu and CTA visibility'
    }
  ];
}

export function calculateConversionFunnel(siteId: string): ConversionFunnel {
  const sessions = store.getSessions(siteId);
  
  const funnelSteps = [
    { name: 'Landing', page: '/' },
    { name: 'Product View', page: '/product' },
    { name: 'Pricing View', page: '/pricing' },
    { name: 'Sign Up', page: '/signup' },
    { name: 'Checkout', page: '/checkout' },
    { name: 'Conversion', page: '/success' }
  ];

  let previousUsers = sessions.length;

  const steps = funnelSteps.map((step, index) => {
    const usersAtStep = sessions.filter(s => s.pages.includes(step.page)).length;
    const conversionRate = index === 0 ? 100 : (usersAtStep / previousUsers) * 100;
    const dropOffRate = 100 - conversionRate;

    const result = {
      name: step.name,
      page: step.page,
      users: usersAtStep,
      conversionRate,
      dropOffRate
    };

    previousUsers = usersAtStep;
    return result;
  });

  return { steps };
}

export function calculateMonthlyStats(siteId: string): MonthlyUserStats[] {
  const sessions = store.getSessions(siteId);
  
  const monthlyData = new Map<string, {
    users: Set<string>;
    newUsers: Set<string>;
    totalSessions: number;
    totalDuration: number;
  }>();

  const knownUsers = new Set<string>();

  sessions.forEach(session => {
    const date = new Date(session.startTime);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, {
        users: new Set(),
        newUsers: new Set(),
        totalSessions: 0,
        totalDuration: 0
      });
    }

    const data = monthlyData.get(monthKey)!;
    const userId = session.userId || session.id;
    data.users.add(userId);
    
    if (!knownUsers.has(userId)) {
      data.newUsers.add(userId);
      knownUsers.add(userId);
    }

    data.totalSessions++;
    data.totalDuration += (session.endTime || session.startTime) - session.startTime;
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return Array.from(monthlyData.entries())
    .map(([key, data]) => {
      const [year, month] = key.split('-').map(Number);
      return {
        month: months[month],
        year,
        totalUsers: data.users.size,
        newUsers: data.newUsers.size,
        returningUsers: data.users.size - data.newUsers.size,
        avgSessionsPerUser: data.totalSessions / data.users.size,
        avgSessionDuration: data.totalDuration / data.totalSessions / 1000
      };
    })
    .sort((a, b) => (a.year * 12 + months.indexOf(a.month)) - (b.year * 12 + months.indexOf(b.month)))
    .slice(-6);
}

export function getAnalyticsDashboard(siteId: string = 'demo'): AnalyticsDashboardData {
  // Ensure demo data exists
  if (store.getSessions(siteId).length === 0) {
    generateDemoData(siteId);
  }

  return {
    metrics: calculateMetrics(siteId),
    userFlow: calculateUserFlow(siteId),
    dropOffPages: calculateDropOffPages(siteId),
    frictionInsights: calculateFrictionInsights(siteId),
    conversionFunnel: calculateConversionFunnel(siteId),
    monthlyStats: calculateMonthlyStats(siteId)
  };
}

// Track a page view (for integration)
export function trackPageView(siteId: string, path: string, sessionId: string, metadata?: any): void {
  const pageView: PageView = {
    id: `pv-${Date.now()}-${Math.random()}`,
    siteId,
    sessionId,
    path,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    timestamp: Date.now(),
    exitPage: false
  };
  
  store.addPageView(siteId, pageView);
}

// Track an event (for integration)
export function trackEvent(
  siteId: string,
  sessionId: string,
  type: AnalyticsEvent['type'],
  target: string,
  metadata?: any
): void {
  const event: AnalyticsEvent = {
    id: `evt-${Date.now()}-${Math.random()}`,
    sessionId,
    type,
    target,
    timestamp: Date.now(),
    metadata
  };

  store.addEvent(siteId, event);
}

export default {
  generateDemoData,
  calculateMetrics,
  calculateUserFlow,
  calculateDropOffPages,
  calculateFrictionInsights,
  calculateConversionFunnel,
  calculateMonthlyStats,
  getAnalyticsDashboard,
  trackPageView,
  trackEvent
};
