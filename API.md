# FlowIQ Analytics API Documentation

Complete reference for FlowIQ's analytics service and tracking API.

## Table of Contents

- [Client-Side API](#client-side-api)
- [Analytics Service API](#analytics-service-api)
- [Data Types](#data-types)
- [Examples](#examples)

---

## Client-Side API

The FlowIQ tracking script provides a global `flowiq()` function for tracking user behavior.

### `flowiq(command, ...args)`

Main function to send analytics data to FlowIQ.

#### Page View Tracking

Track when users visit a page.

```javascript
// Automatic tracking (happens on page load)
// No code needed - automatically tracked

// Manual tracking (for SPAs)
flowiq('pageview', {
  path: '/custom-path',
  title: 'Custom Page Title',
  referrer: 'https://google.com'
});
```

**Parameters:**
- `path` (string, optional): Page path, defaults to `window.location.pathname`
- `title` (string, optional): Page title, defaults to `document.title`
- `referrer` (string, optional): Referrer URL, defaults to `document.referrer`

#### Event Tracking

Track custom user actions and interactions.

```javascript
flowiq('event', 'button_click', {
  button_name: 'Sign Up',
  location: 'header',
  plan: 'premium'
});
```

**Parameters:**
- `eventName` (string, required): Name of the event
- `properties` (object, optional): Custom event properties

**Common events:**
- `click`: User clicked an element
- `form_submit`: User submitted a form
- `form_error`: User encountered a form error
- `scroll_depth`: User scrolled to certain depth
- `purchase`: User completed a purchase
- `signup`: User signed up
- `download`: User downloaded a file

#### User Identification

Associate analytics data with a specific user.

```javascript
flowiq('identify', {
  userId: 'user_12345',
  email: 'user@example.com',
  name: 'John Doe',
  plan: 'premium',
  company: 'Acme Corp'
});
```

**Parameters:**
- `userId` (string, required): Unique user identifier
- Additional properties (optional): Any custom user attributes

#### Set Properties

Set custom properties for the current session.

```javascript
flowiq('set', {
  user_type: 'premium',
  experiment_group: 'variant_a',
  feature_flags: ['new_ui', 'beta_features']
});
```

---

## Analytics Service API

Backend analytics processing functions (TypeScript/JavaScript).

### Import

```typescript
import {
  generateDemoData,
  getAnalyticsDashboard,
  calculateMetrics,
  calculateUserFlow,
  trackPageView,
  trackEvent
} from '@/services/analyticsService';
```

### `generateDemoData(siteId: string)`

Generate realistic demo analytics data.

```typescript
generateDemoData('demo-site');
```

Creates 15,000 simulated user sessions with:
- Page views across 6 common pages
- Click, scroll, and form events
- Device and location information
- Realistic user journeys

### `getAnalyticsDashboard(siteId: string): AnalyticsDashboardData`

Get complete analytics dashboard data for a site.

```typescript
const dashboardData = getAnalyticsDashboard('my-site-id');

console.log(dashboardData.metrics.totalUsers); // 12,459
console.log(dashboardData.userFlow); // User flow data
console.log(dashboardData.dropOffPages); // High drop-off pages
```

**Returns:**
```typescript
{
  metrics: SiteMetrics,
  userFlow: UserFlowData[],
  dropOffPages: DropOffPage[],
  frictionInsights: FrictionInsight[],
  conversionFunnel: ConversionFunnel,
  monthlyStats: MonthlyUserStats[]
}
```

### `calculateMetrics(siteId: string, timeRange?: TimeRange): SiteMetrics`

Calculate key performance metrics.

```typescript
const metrics = calculateMetrics('my-site-id', {
  start: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
  end: Date.now()
});

console.log(metrics.totalUsers); // 5,234
console.log(metrics.conversionRate); // 3.24
console.log(metrics.dropOffRate); // 45.2
```

**Returns:**
```typescript
{
  siteId: string,
  totalUsers: number,
  conversionRate: number,
  dropOffRate: number,
  clickThroughRate: number,
  avgSessionDuration: number,
  bounceRate: number,
  timeRange: { start: number, end: number },
  trend: {
    totalUsers: number,
    conversionRate: number,
    dropOffRate: number,
    clickThroughRate: number
  }
}
```

### `calculateUserFlow(siteId: string): UserFlowData[]`

Get user navigation flows between pages.

```typescript
const flows = calculateUserFlow('my-site-id');

flows.forEach(flow => {
  console.log(`${flow.from} → ${flow.to}`);
  console.log(`${flow.users} users (${flow.dropOff}% drop-off)`);
});
```

**Returns:**
```typescript
Array<{
  from: string,
  to: string,
  users: number,
  dropOff: number // percentage
}>
```

### `calculateDropOffPages(siteId: string): DropOffPage[]`

Identify pages with highest exit rates.

```typescript
const dropOffPages = calculateDropOffPages('my-site-id');

dropOffPages.forEach(page => {
  console.log(`${page.page}: ${page.rate}% exit rate`);
  console.log(`Affected users: ${page.users}`);
});
```

**Returns:**
```typescript
Array<{
  page: string,
  rate: number,
  users: number,
  avgTimeOnPage: number,
  exitReasons: string[]
}>
```

### `calculateFrictionInsights(siteId: string): FrictionInsight[]`

Detect UX issues causing friction.

```typescript
const insights = calculateFrictionInsights('my-site-id');

insights.forEach(insight => {
  console.log(`${insight.type}: ${insight.description}`);
  console.log(`Recommendation: ${insight.recommendation}`);
});
```

**Returns:**
```typescript
Array<{
  type: 'slow_load' | 'form_error' | 'navigation_issue' | 'broken_link',
  page: string,
  severity: 'low' | 'medium' | 'high',
  affectedUsers: number,
  description: string,
  recommendation: string
}>
```

### `calculateConversionFunnel(siteId: string): ConversionFunnel`

Analyze multi-step conversion funnel.

```typescript
const funnel = calculateConversionFunnel('my-site-id');

funnel.steps.forEach(step => {
  console.log(`${step.name}: ${step.users} users`);
  console.log(`Conversion: ${step.conversionRate}%`);
  console.log(`Drop-off: ${step.dropOffRate}%`);
});
```

**Returns:**
```typescript
{
  steps: Array<{
    name: string,
    page: string,
    users: number,
    conversionRate: number,
    dropOffRate: number
  }>
}
```

### `calculateMonthlyStats(siteId: string): MonthlyUserStats[]`

Get monthly user statistics.

```typescript
const monthlyStats = calculateMonthlyStats('my-site-id');

monthlyStats.forEach(month => {
  console.log(`${month.month} ${month.year}`);
  console.log(`Total: ${month.totalUsers}`);
  console.log(`New: ${month.newUsers}`);
  console.log(`Returning: ${month.returningUsers}`);
});
```

**Returns:**
```typescript
Array<{
  month: string,
  year: number,
  totalUsers: number,
  newUsers: number,
  returningUsers: number,
  avgSessionsPerUser: number,
  avgSessionDuration: number
}>
```

### `trackPageView(siteId, path, sessionId, metadata?)`

Manually track a page view (for custom implementations).

```typescript
trackPageView('my-site-id', '/checkout', 'session_123', {
  category: 'ecommerce'
});
```

### `trackEvent(siteId, sessionId, type, target, metadata?)`

Manually track an event.

```typescript
trackEvent('my-site-id', 'session_123', 'click', 'buy-button', {
  product: 'premium-plan',
  price: 49.99
});
```

---

## Data Types

### PageView

```typescript
interface PageView {
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
```

### UserSession

```typescript
interface UserSession {
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
```

### AnalyticsEvent

```typescript
interface AnalyticsEvent {
  id: string;
  sessionId: string;
  type: 'click' | 'form_submit' | 'form_error' | 'scroll' | 'exit' | 'custom';
  target: string;
  timestamp: number;
  metadata?: Record<string, any>;
}
```

### DeviceInfo

```typescript
interface DeviceInfo {
  browser: string;
  os: string;
  device: 'mobile' | 'tablet' | 'desktop';
  screenResolution: string;
}
```

### LocationInfo

```typescript
interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone: string;
}
```

---

## Examples

### React Integration

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnalyticsDashboard } from '@/services/analyticsService';

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    if (window.flowiq) {
      window.flowiq('pageview', {
        path: location.pathname,
        title: document.title
      });
    }
  }, [location]);

  return null;
}

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dashboardData = getAnalyticsDashboard('my-site-id');
    setData(dashboardData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Total Users: {data.metrics.totalUsers}</h1>
      <h2>Conversion Rate: {data.metrics.conversionRate}%</h2>
      {/* ... */}
    </div>
  );
}
```

### Track E-commerce Events

```javascript
// Product view
flowiq('event', 'product_view', {
  product_id: 'prod_123',
  product_name: 'Premium Plan',
  price: 49.99,
  category: 'subscription'
});

// Add to cart
flowiq('event', 'add_to_cart', {
  product_id: 'prod_123',
  quantity: 1,
  value: 49.99
});

// Purchase
flowiq('event', 'purchase', {
  transaction_id: 'txn_456',
  value: 49.99,
  currency: 'USD',
  items: [
    { product_id: 'prod_123', quantity: 1, price: 49.99 }
  ]
});
```

### Track Form Interactions

```javascript
// Form start
flowiq('event', 'form_start', {
  form_id: 'signup-form',
  form_name: 'Sign Up'
});

// Field focus
flowiq('event', 'form_field_focus', {
  form_id: 'signup-form',
  field_name: 'email'
});

// Form error
flowiq('event', 'form_error', {
  form_id: 'signup-form',
  field_name: 'email',
  error_message: 'Invalid email format'
});

// Form submit
flowiq('event', 'form_submit', {
  form_id: 'signup-form',
  success: true
});
```

### Custom Dashboard Component

```typescript
import { getAnalyticsDashboard } from '@/services/analyticsService';
import type { AnalyticsDashboardData } from '@/types/analytics';

function CustomDashboard({ siteId }: { siteId: string }) {
  const data = getAnalyticsDashboard(siteId);

  return (
    <div>
      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard 
          title="Total Users"
          value={data.metrics.totalUsers}
          trend={data.metrics.trend.totalUsers}
        />
        <MetricCard 
          title="Conversion Rate"
          value={`${data.metrics.conversionRate.toFixed(2)}%`}
          trend={data.metrics.trend.conversionRate}
        />
        {/* ... more cards */}
      </div>

      {/* User Flow */}
      <UserFlowChart data={data.userFlow} />

      {/* Drop-off Pages */}
      <DropOffTable pages={data.dropOffPages} />

      {/* Friction Insights */}
      <FrictionList insights={data.frictionInsights} />
    </div>
  );
}
```

---

## Response Codes (Future API Implementation)

When implementing a real API endpoint, use these response codes:

- `200 OK` - Request successful
- `201 Created` - Data created successfully
- `400 Bad Request` - Invalid parameters
- `401 Unauthorized` - Missing or invalid Site ID
- `404 Not Found` - Site ID not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

## Rate Limits (Future Implementation)

Recommended rate limits for production API:

- **Free Plan**: 1,000 events/day
- **Pro Plan**: 100,000 events/day
- **Enterprise**: Unlimited

---

## Changelog

### Version 1.0.0 (January 2025)
- Initial release
- Client-side tracking script
- Analytics service with demo data generation
- Complete dashboard data API
- TypeScript type definitions

---

For more information:
- [Integration Guide](INTEGRATION.md)
- [README](README.md)
- [GitHub Repository](https://github.com/PranayK07/FlowIQ)

