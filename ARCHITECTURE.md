# FlowIQ Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       User's Website                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         FlowIQ Tracking Script (flowiq-track.js)       │ │
│  │  • Auto-tracks page views, clicks, forms, scrolls      │ │
│  │  • Generates session & user IDs                        │ │
│  │  • Detects device, browser, location                   │ │
│  │  • Public API: flowiq('event', 'pageview', 'identify') │ │
│  └─────────────────┬──────────────────────────────────────┘ │
└────────────────────┼────────────────────────────────────────┘
                     │
                     │ Analytics Events
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              FlowIQ Analytics Platform                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Analytics Service (Backend Logic)           │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │  Data Store (In-Memory / Future: Database)  │     │  │
│  │  │  • Page Views                               │     │  │
│  │  │  • User Sessions                            │     │  │
│  │  │  • Events (clicks, forms, scrolls)          │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  │                       │                               │  │
│  │                       ▼                               │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │       Analytics Engine (Processing)          │     │  │
│  │  │  • Calculate Metrics                        │     │  │
│  │  │  • Analyze User Flows                       │     │  │
│  │  │  • Detect Drop-offs                         │     │  │
│  │  │  • Identify Friction Points                 │     │  │
│  │  │  • Build Conversion Funnels                 │     │  │
│  │  │  • Aggregate Monthly Stats                  │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  │                                                        │  │
│  └──────────────────┬─────────────────────────────────────┘  │
│                     │                                         │
│                     │ Analytics Data                          │
│                     ▼                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Dashboard UI (React Components)               │   │
│  │  • Overview Metrics Cards                            │   │
│  │  • User Flow Visualization                           │   │
│  │  • Drop-off Pages Table                              │   │
│  │  • Friction Insights List                            │   │
│  │  • Conversion Funnel Chart                           │   │
│  │  • Monthly Statistics Graph                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Data Collection (Client-Side)

```
User Action → Tracking Script → Event Generated → Stored Locally
   │              │                   │                  │
   ├─ Page view   ├─ Auto-track      ├─ PageView       └─ sessionStorage
   ├─ Click       ├─ Event listener  ├─ AnalyticsEvent     (demo mode)
   ├─ Form submit ├─ Device detect   ├─ UserSession
   └─ Scroll      └─ Session ID      └─ metadata
```

### 2. Data Processing (Backend Logic)

```
Raw Events → Analytics Service → Calculated Metrics → Dashboard Data
     │             │                    │                    │
     ├─ 15K        ├─ generateDemoData  ├─ Total Users      ├─ SiteMetrics
     │  sessions   ├─ calculateMetrics  ├─ Conversion Rate  ├─ UserFlowData[]
     │             ├─ calculateUserFlow ├─ Drop-off Rate    ├─ DropOffPage[]
     └─ Events     └─ analyzeFriction   └─ Insights         └─ FrictionInsight[]
```

### 3. Data Visualization (Frontend)

```
Dashboard Component → Load Data → Render UI → User Insights
        │                │            │             │
        ├─ useEffect     ├─ getAnalyticsDashboard  ├─ Metric cards
        ├─ useState      ├─ Process data           ├─ Flow charts
        └─ Render        └─ Format numbers         └─ Tables & lists
```

## Technology Stack

### Frontend
- **React 18**: Component-based UI
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Styling
- **shadcn/ui**: Component library
- **Recharts**: Data visualization
- **Vite**: Build tool

### Analytics Engine
- **TypeScript**: Core logic
- **In-Memory Store**: Demo data storage
- **Map/Set**: Efficient data structures
- **Date-fns**: Date manipulation

### Tracking Script
- **Vanilla JavaScript**: No dependencies
- **History API**: SPA navigation
- **Local/Session Storage**: ID persistence
- **Event Listeners**: Auto-tracking

## Key Components

### 1. Analytics Service (`src/services/analyticsService.ts`)

**Responsibilities:**
- Generate realistic demo data (15,000 sessions)
- Store and retrieve analytics events
- Calculate site metrics
- Analyze user behavior patterns
- Detect friction points
- Build conversion funnels

**Key Functions:**
- `generateDemoData(siteId)` - Creates sample data
- `getAnalyticsDashboard(siteId)` - Returns all dashboard data
- `calculateMetrics(siteId)` - Computes KPIs
- `calculateUserFlow(siteId)` - Maps navigation paths
- `calculateDropOffPages(siteId)` - Identifies problem pages
- `calculateFrictionInsights(siteId)` - Detects UX issues

### 2. Tracking Script (`public/flowiq-track.js`)

**Responsibilities:**
- Initialize tracking on page load
- Auto-track user interactions
- Generate session and user IDs
- Detect device and browser info
- Handle SPA navigation
- Provide public API

**Key Features:**
- Event delegation for clicks
- Form submission tracking
- Scroll depth monitoring
- Page exit detection
- History API integration
- Beacon API for exit events

### 3. Dashboard (`src/pages/Dashboard.tsx`)

**Responsibilities:**
- Display analytics overview
- Show user flow visualization
- List high drop-off pages
- Present friction insights
- Render metrics cards

**Key Sections:**
- Metrics Overview (4 key metrics)
- User Flow Analysis (visual diagram)
- High Drop-off Pages (table)
- Friction Insights (recommendations)

## Data Models

### Core Entities

```typescript
PageView {
  id, siteId, sessionId, userId,
  path, referrer, timestamp,
  duration, exitPage
}

UserSession {
  id, siteId, userId,
  startTime, endTime,
  pages[], events[],
  device{}, location{}
}

AnalyticsEvent {
  id, sessionId,
  type, target, timestamp,
  metadata{}
}
```

### Computed Metrics

```typescript
SiteMetrics {
  totalUsers, conversionRate,
  dropOffRate, clickThroughRate,
  avgSessionDuration, bounceRate,
  trend{}
}

UserFlowData {
  from, to, users, dropOff
}

DropOffPage {
  page, rate, users,
  avgTimeOnPage, exitReasons[]
}
```

## Integration Points

### 1. Website Integration

```html
<!-- Add to <head> -->
<script src="flowiq-track.js?id=SITE_ID"></script>
```

### 2. React Integration

```typescript
import { getAnalyticsDashboard } from '@/services/analyticsService';

const data = getAnalyticsDashboard('my-site');
```

### 3. Custom Events

```javascript
flowiq('event', 'purchase', { value: 99.99 });
```

## Scalability Considerations

### Current Implementation (Demo)
- In-memory data storage
- Single-site focus
- 15K sessions generated
- Client-side processing

### Production Ready (Future)
- PostgreSQL/MongoDB backend
- Multi-tenancy support
- Millions of events
- Server-side processing
- CDN for tracking script
- WebSocket for real-time
- Redis for caching
- Queue for event processing

## Security

### Current
- No personal data collected by default
- Session IDs (not user IDs by default)
- Client-side only
- No authentication needed for demo

### Production (Future)
- API authentication (JWT)
- Rate limiting
- Data encryption at rest
- HTTPS only
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection

## Performance

### Tracking Script
- **Size**: ~9KB (minified)
- **Async loading**: Non-blocking
- **Impact**: <5ms overhead
- **Events**: Debounced/throttled

### Analytics Processing
- **Demo Data Generation**: ~500ms for 15K sessions
- **Metrics Calculation**: <100ms
- **Dashboard Load**: <1s total

### Optimization Strategies
- Lazy loading components
- Memoization of calculations
- Virtual scrolling for large lists
- Debounced event handlers
- Efficient data structures (Map/Set)

## Monitoring & Logging

### Current (Development)
- Console logging
- Error boundaries in React
- Browser DevTools

### Production (Future)
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Analytics on analytics (meta!)
- Uptime monitoring
- Alert system

## Deployment

### Current (Static Site)
- GitHub Pages
- Vite build
- Client-side only

### Production (Future)
- Frontend: Vercel/Netlify
- Backend API: AWS/GCP/Azure
- Database: Managed PostgreSQL
- CDN: CloudFlare
- Monitoring: Datadog

## Testing Strategy

### Unit Tests (Future)
- Analytics service functions
- Calculation logic
- Data transformations

### Integration Tests (Future)
- API endpoints
- Database operations
- Event processing pipeline

### E2E Tests (Future)
- Dashboard interactions
- Tracking script functionality
- Multi-page flows

## Documentation Structure

```
FlowIQ/
├── README.md           # Overview & quick start
├── INTEGRATION.md      # Setup guide for websites
├── API.md              # Complete API reference
├── ARCHITECTURE.md     # This file
├── src/
│   ├── types/
│   │   └── analytics.ts      # Type definitions
│   ├── services/
│   │   └── analyticsService.ts  # Core logic
│   └── pages/
│       └── Dashboard.tsx     # UI component
└── public/
    └── flowiq-track.js       # Tracking script
```

---

For more information:
- [README](README.md) - Project overview
- [INTEGRATION](INTEGRATION.md) - How to integrate
- [API](API.md) - API documentation
- [GitHub](https://github.com/PranayK07/FlowIQ) - Source code
