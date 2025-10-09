# FlowIQ 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![React](https://img.shields.io/badge/React-18.x-blue.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)]()
[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://pranayk07.github.io/FlowIQ/)

**FlowIQ** empowers businesses to understand and optimize their online performance through advanced analytics and user behavior insights. With real-time data tracking, heatmaps, and intuitive dashboards, companies can easily see how visitors navigate their site—pinpointing exactly where and why users drop off.

---

## 📑 Table of Contents

- [Features](#-features)  
- [Motivation](#-motivation)  
- [Architecture / Design](#-architecture--design)  
- [Installation](#-installation)  
- [Usage](#-usage)  
- [Examples](#-examples)  
- [Configuration](#-configuration)  
- [API Reference](#-api-reference)  
- [Testing](#-testing)  
- [Contributing](#-contributing)  
- [Roadmap / Future Work](#-roadmap--future-work)  
- [License](#-license)  
- [Acknowledgements](#-acknowledgements)

---

## ✨ Features

- **Visual User Flows**: Interactive journey maps showing exactly how users navigate your site
- **Drop-off Detection**: Automatically identify pages with high exit rates and friction points
- **Behavior Analytics**: Track patterns, conversion funnels, and user engagement metrics
- **Friction Insights**: Spot technical issues like slow loads or form errors impacting UX
- **Export Reports**: Download comprehensive CSV/PDF reports for your team
- **Easy Integration**: Simple JavaScript snippet or direct analytics platform integration

---

## 💡 Motivation

Why this project exists:

- Businesses struggle to understand why users abandon their websites
- Provides actionable insights into user behavior and drop-off patterns
- Transforms complex data into visual, easy-to-understand analytics
- Helps companies optimize conversions and improve user experience
- Reduces guesswork in website optimization decisions

---

## 🏗 Architecture / Design

```
FlowIQ/
├── src/
│   ├── pages/
│   │   ├── Index.tsx             # Landing page
│   │   ├── Dashboard.tsx         # Analytics dashboard
│   │   ├── Features.tsx          # Features page
│   │   └── TradingDashboard.tsx  # Optional trading tools
│   ├── components/
│   │   └── ui/                   # Reusable UI components
│   └── types/                    # TypeScript type definitions
├── public/                       # Static assets
└── dist/                         # Production build
```

- **pages/**: Main application pages including landing, dashboard, and features
- **components/**: Reusable UI components built with React and shadcn/ui  
- **types/**: TypeScript interfaces and type definitions
- Built with React 18, TypeScript, Tailwind CSS, and shadcn/ui

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/PranayK07/FlowIQ.git
cd FlowIQ

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## ▶️ Usage

### Quick Start

1. **View the Live Demo**: Visit [https://pranayk07.github.io/FlowIQ/](https://pranayk07.github.io/FlowIQ/)
2. **Explore the Dashboard**: See real analytics data with 15,000+ simulated user sessions
3. **Read the Integration Guide**: Check [INTEGRATION.md](INTEGRATION.md) for complete setup instructions

### Integrate with Your Website (5 minutes)

Add this snippet to your website's `<head>` section:

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

**That's it!** FlowIQ now automatically tracks:
- ✅ Page views and user sessions
- ✅ Click events and form interactions  
- ✅ Scroll depth and time on page
- ✅ Exit points and drop-offs
- ✅ Device and traffic source information

### Platform-Specific Integration

- **React/Next.js**: Use the `useFlowIQ` hook (see [INTEGRATION.md](INTEGRATION.md))
- **WordPress**: Add via theme header or Insert Headers plugin
- **Shopify**: Add to theme.liquid file
- **Webflow**: Add to Project Settings > Custom Code

See [INTEGRATION.md](INTEGRATION.md) for detailed platform guides.

---

## 📊 Examples

### Web Interface

1. Visit [https://pranayk07.github.io/FlowIQ/](https://pranayk07.github.io/FlowIQ/)
2. Click "View Demo" to access the Analytics Dashboard
3. Explore the user flow visualization showing where visitors navigate
4. Review drop-off rates at different pages
5. Check conversion funnel analysis
6. Export reports as needed

### Key Metrics Tracked

- **Total Users**: Track visitor count and trends
- **Conversion Rate**: Monitor how many users complete desired actions
- **Drop-off Rate**: Identify pages where users leave
- **Click Through Rate**: Measure engagement with CTAs
- **User Flow Paths**: Visualize navigation patterns
- **Friction Points**: Detect UX issues and bottlenecks

---

## 🛠 Configuration

FlowIQ provides an intuitive dashboard interface:

- **Real-time Analytics**: View live user behavior data
- **Custom Time Ranges**: Analyze data by hour, day, week, or month
- **Segmentation**: Group users by behavior, demographics, or custom attributes
- **Alert Configuration**: Set up notifications for high drop-off rates
- **Export Options**: Download reports in CSV or PDF format
- **Team Collaboration**: Share insights with stakeholders

---

## 📚 API Reference

Complete API documentation is available in [API.md](API.md)

### Quick Reference

**Client-Side Tracking:**
```javascript
// Track page view
flowiq('pageview', { path: '/page', title: 'Page Title' });

// Track event
flowiq('event', 'button_click', { button: 'signup' });

// Identify user
flowiq('identify', { userId: 'user_123', email: 'user@example.com' });
```

**Analytics Service:**
```typescript
import { getAnalyticsDashboard } from '@/services/analyticsService';

const data = getAnalyticsDashboard('my-site-id');
console.log(data.metrics.totalUsers);
console.log(data.userFlow);
console.log(data.dropOffPages);
```

See [API.md](API.md) for complete documentation.

---

## ✅ Testing

Run linting and type checks:

```bash
npm run lint
```

Build the application:

```bash
npm run build
```

Test the analytics service:
```bash
npm run dev
# Visit http://localhost:8080/dashboard to see live analytics
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repo  
2. Create a feature branch (`git checkout -b feature/my-feature`)  
3. Commit changes with clear messages  
4. Run tests to ensure stability  
5. Open a Pull Request  

---

## 🚀 Roadmap / Future Work

- Real-time user behavior tracking
- Advanced heatmap visualizations
- A/B testing integration
- Session replay functionality
- Machine learning-powered insights
- Mobile app analytics
- Enhanced API capabilities
- Enterprise SSO integration

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- Open-source libraries: React, TypeScript, Tailwind CSS, shadcn/ui
- Analytics platform inspiration from industry leaders
- All contributors and testers
