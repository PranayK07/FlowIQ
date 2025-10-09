# FlowIQ Integration Guide

Get started with FlowIQ analytics in minutes. This guide will walk you through integrating FlowIQ with your website.

## Quick Start (5 minutes)

### Step 1: Get Your Site ID

Visit [https://pranayk07.github.io/FlowIQ/](https://pranayk07.github.io/FlowIQ/) and sign up for a free account to get your unique Site ID.

For demo purposes, you can use: `demo-site-123`

### Step 2: Add the Tracking Script

Add this script to the `<head>` section of your website, just before the closing `</head>` tag:

```html
<!-- FlowIQ Analytics -->
<script>
(function(w,d,s,l,i){
  w[l]=w[l]||[];w[l].push({'flowiq.start':new Date().getTime(),event:'flowiq.js'});
  var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;j.src='https://pranayk07.github.io/FlowIQ/flowiq-track.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','flowiqDataLayer','YOUR-SITE-ID');
</script>
```

Replace `YOUR-SITE-ID` with your actual Site ID.

### Step 3: Verify Installation

1. Open your website in a browser
2. Open browser DevTools (F12)
3. Go to the Console tab
4. You should see: `FlowIQ Analytics initialized for site: YOUR-SITE-ID`

That's it! FlowIQ is now tracking user behavior on your site.

---

## What Gets Tracked Automatically

FlowIQ automatically tracks:

- ✅ **Page Views** - Every page your users visit
- ✅ **User Sessions** - Complete user journeys across your site
- ✅ **Click Events** - All button and link clicks
- ✅ **Form Interactions** - Form submissions and errors
- ✅ **Scroll Depth** - How far users scroll on each page
- ✅ **Exit Points** - Where users leave your site
- ✅ **Device Information** - Browser, OS, screen resolution
- ✅ **Traffic Sources** - Where users come from

---

## Advanced Tracking

### Track Custom Events

Track specific user actions important to your business:

```javascript
// Track a custom event
flowiq('event', 'button_click', {
  button_name: 'Sign Up',
  location: 'header'
});

// Track a conversion
flowiq('event', 'purchase', {
  value: 99.99,
  currency: 'USD',
  product_id: 'prod_123'
});
```

### Identify Users

Associate analytics data with specific users:

```javascript
// After user logs in
flowiq('identify', {
  userId: 'user_12345',
  email: 'user@example.com',
  name: 'John Doe',
  plan: 'premium'
});
```

### Track Page Views Manually (for SPAs)

If you're using a Single Page Application (React, Vue, Angular):

```javascript
// Call this when route changes
flowiq('pageview', {
  path: '/new-page',
  title: 'New Page Title'
});
```

---

## Integration Examples

### React / Next.js

```jsx
// Create a FlowIQ hook
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useFlowIQ(siteId) {
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
}

// Use in your app
function App() {
  useFlowIQ('YOUR-SITE-ID');
  return <div>Your App</div>;
}
```

### WordPress

1. Go to **Appearance > Theme Editor**
2. Open **header.php**
3. Paste the tracking script before `</head>`
4. Click **Update File**

Or use a plugin like "Insert Headers and Footers"

### Shopify

1. Go to **Online Store > Themes**
2. Click **Actions > Edit Code**
3. Open **theme.liquid**
4. Paste the tracking script before `</head>`
5. Click **Save**

### Webflow

1. Go to **Project Settings**
2. Click **Custom Code**
3. Paste the tracking script in **Head Code**
4. Click **Save** and **Publish**

---

## Viewing Your Analytics

### Access Your Dashboard

Visit your FlowIQ dashboard at: [https://pranayk07.github.io/FlowIQ/dashboard](https://pranayk07.github.io/FlowIQ/dashboard)

### Key Metrics

Your dashboard displays:

1. **Overview Metrics**
   - Total Users (last 30 days)
   - Conversion Rate
   - Drop-off Rate
   - Click Through Rate

2. **User Flow Analysis**
   - Visual representation of user journeys
   - Page-to-page transitions
   - Drop-off points highlighted

3. **High Drop-off Pages**
   - Pages where users exit most
   - Number of users affected
   - Exit rate percentage

4. **Friction Insights**
   - Slow page loads
   - Form errors
   - Navigation issues
   - Actionable recommendations

5. **Conversion Funnel**
   - Multi-step conversion tracking
   - Conversion rates at each step
   - Drop-off analysis

6. **Monthly Statistics**
   - Total users per month
   - New vs returning users
   - Session duration trends

---

## Privacy & Compliance

FlowIQ is designed with privacy in mind:

- ✅ **GDPR Compliant** - No personal data collected by default
- ✅ **CCPA Compliant** - Users can opt out easily
- ✅ **Cookie-free Option** - Use local storage instead
- ✅ **Data Retention** - Configurable retention periods
- ✅ **EU Hosting Available** - Keep data in EU regions

### Cookie Banner Integration

If you use a cookie consent banner, initialize FlowIQ only after consent:

```javascript
// After user accepts cookies
if (userAcceptedCookies) {
  // Initialize FlowIQ
  const script = document.createElement('script');
  script.src = 'https://pranayk07.github.io/FlowIQ/flowiq-track.js?id=YOUR-SITE-ID';
  document.head.appendChild(script);
}
```

---

## Configuration Options

Customize FlowIQ behavior:

```html
<script>
window.flowiqConfig = {
  siteId: 'YOUR-SITE-ID',
  
  // Track all clicks automatically
  autoTrackClicks: true,
  
  // Track form submissions
  autoTrackForms: true,
  
  // Track scroll depth
  autoTrackScroll: true,
  
  // Sample rate (0-1, 1 = 100% of users)
  sampleRate: 1.0,
  
  // Anonymize IP addresses
  anonymizeIp: true,
  
  // Cookie options
  cookieDomain: 'auto',
  cookieExpires: 365,
  
  // Custom endpoint (for self-hosted)
  endpoint: 'https://your-api.com/track'
};
</script>
```

---

## Troubleshooting

### Script Not Loading

**Problem:** Analytics script fails to load

**Solutions:**
1. Check for ad blockers (they may block analytics scripts)
2. Verify the script URL is correct
3. Check browser console for errors
4. Ensure your Site ID is valid

### No Data in Dashboard

**Problem:** Dashboard shows no analytics data

**Solutions:**
1. Wait 5-10 minutes for data to process
2. Verify the tracking script is installed correctly
3. Check that your Site ID matches in both places
4. Test with a incognito/private browser window

### SPA Not Tracking Route Changes

**Problem:** Single Page Apps not tracking page views

**Solution:** Manually track page views on route change (see React example above)

### CORS Errors

**Problem:** "Access-Control-Allow-Origin" errors in console

**Solution:** FlowIQ endpoint allows all origins. If using a custom endpoint, ensure CORS is configured.

---

## API Reference

### flowiq() Function

The global `flowiq()` function accepts various commands:

#### Page View
```javascript
flowiq('pageview', {
  path: '/page-path',
  title: 'Page Title',
  referrer: document.referrer
});
```

#### Event Tracking
```javascript
flowiq('event', 'event_name', {
  category: 'category',
  label: 'label',
  value: 123,
  // ... custom properties
});
```

#### User Identification
```javascript
flowiq('identify', {
  userId: 'user_123',
  email: 'user@example.com',
  // ... custom properties
});
```

#### Set Properties
```javascript
flowiq('set', {
  user_type: 'premium',
  plan: 'pro',
  // ... custom properties
});
```

---

## Best Practices

### 1. Track What Matters

Focus on events that impact your business:
- Sign ups
- Purchases
- Content downloads
- Feature usage
- Support requests

### 2. Use Descriptive Event Names

❌ Bad: `flowiq('event', 'btn_click')`
✅ Good: `flowiq('event', 'clicked_signup_button', { location: 'header' })`

### 3. Add Context

Include relevant metadata with events:

```javascript
flowiq('event', 'search', {
  query: searchTerm,
  results_count: resultsCount,
  filters_applied: activeFilters
});
```

### 4. Test Before Deploying

Always test tracking in a staging environment before pushing to production.

### 5. Monitor Regularly

Check your dashboard weekly to identify trends and issues early.

---

## Support

### Documentation
- Full docs: [https://github.com/PranayK07/FlowIQ](https://github.com/PranayK07/FlowIQ)
- API Reference: See above
- Examples: Check the `/examples` folder

### Community
- GitHub Issues: [Report bugs or request features](https://github.com/PranayK07/FlowIQ/issues)
- Discussions: [Ask questions](https://github.com/PranayK07/FlowIQ/discussions)

### Contact
- Email: support@flowiq.io
- Response time: 24-48 hours

---

## What's Next?

After integrating FlowIQ:

1. ✅ **Wait 24-48 hours** for meaningful data to accumulate
2. ✅ **Review your dashboard** regularly to spot trends
3. ✅ **Act on friction insights** to improve user experience
4. ✅ **Set up alerts** for high drop-off rates
5. ✅ **Export reports** to share with your team
6. ✅ **Optimize your funnel** based on conversion data

---

## Pricing

- **Free**: Up to 1,000 users/month
- **Pro**: $49/month - Unlimited users
- **Enterprise**: $199/month - Custom integrations + support

[View full pricing →](https://pranayk07.github.io/FlowIQ/)

---

*Last updated: January 2025*
