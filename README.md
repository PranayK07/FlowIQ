# FlowIQ 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)

**FlowIQ** is a powerful user behavior analytics web application that helps you understand how users navigate your website, identify drop-off points, and optimize conversions. Built with React, TypeScript, and modern web technologies.

---

## 📑 Table of Contents

- [Features](#-features)  
- [Demo](#-demo)  
- [Technology Stack](#-technology-stack)  
- [Installation](#-installation)  
- [Usage](#-usage)  
- [Project Structure](#-project-structure)  
- [Available Routes](#-available-routes)  
- [Development](#-development)  
- [Building for Production](#-building-for-production)  
- [Contributing](#-contributing)  
- [Roadmap](#-roadmap)  
- [License](#-license)  

---

## ✨ Features

### Core Analytics Features
- **Visual User Flows** - Interactive journey maps showing exactly how users navigate your site
- **Drop-off Detection** - Automatically identify pages with high exit rates and friction points
- **Behavior Analytics** - Track patterns, conversion funnels, and user engagement metrics
- **Friction Insights** - Spot technical issues like slow loads or form errors impacting UX
- **Export Reports** - Download comprehensive CSV/PDF reports for your team
- **User Segmentation** - Group users by behavior, demographics, or custom attributes

### Technical Features
- Real-time analytics dashboard
- Interactive data visualizations with Recharts
- Responsive design for all devices
- Dark/light theme support
- Modern UI with shadcn/ui components
- Fast performance with Vite
- Type-safe codebase with TypeScript

---

## 🎯 Demo

The application includes a live demo dashboard showcasing:
- User flow analysis with conversion funnels
- High drop-off page identification
- Key performance metrics (users, conversion rate, drop-off rate, click-through)
- Friction insights and recommendations

Visit the application and navigate to the `/dashboard` route to see the interactive demo.

---

## 🛠 Technology Stack

- **Framework**: React 18.3
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router 6.30
- **Charts**: Recharts 2.15
- **State Management**: TanStack Query 5.83
- **Icons**: Lucide React
- **Theme**: next-themes

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+ and npm (or bun)
- Git

### Steps

```bash
# Clone the repository
git clone https://github.com/PranayK07/FlowIQ.git
cd FlowIQ

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

---

## ▶️ Usage

### Development Mode

```bash
npm run dev
```

Starts the Vite development server with hot module replacement (HMR).

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Locally preview the production build.

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality.

---

## 📁 Project Structure

```
FlowIQ/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui component library
│   │   └── ThemeToggle.tsx # Theme switcher component
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Route pages
│   │   ├── Index.tsx       # Homepage
│   │   ├── Features.tsx    # Features page
│   │   ├── Dashboard.tsx   # Analytics dashboard
│   │   └── NotFound.tsx    # 404 page
│   ├── App.tsx             # Root application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

---

## 🗺️ Available Routes

- `/` - Homepage with product overview and pricing
- `/features` - Detailed features page
- `/dashboard` - Interactive analytics dashboard (demo)
- `*` - 404 Not Found page

---

## 🔧 Development

### Adding New Routes

1. Create a new page component in `src/pages/`
2. Import and add the route in `src/App.tsx`

Example:
```tsx
import NewPage from "./pages/NewPage";

// In the Routes component
<Route path="/new-page" element={<NewPage />} />
```

### Using UI Components

FlowIQ uses shadcn/ui components. Import them from `@/components/ui/`:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

### Theme Support

The application supports dark/light themes using `next-themes`. Use the `ThemeToggle` component:

```tsx
import { ThemeToggle } from "@/components/ThemeToggle";
```

---

## 🏗️ Building for Production

```bash
# Create production build
npm run build

# The build output will be in the dist/ directory
```

To deploy, upload the contents of the `dist/` directory to your web server or hosting platform (Vercel, Netlify, AWS S3, etc.).

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes with clear messages
4. Ensure linting passes (`npm run lint`)
5. Test your changes thoroughly
6. Open a Pull Request

---

## 🚀 Roadmap

- [ ] Backend API integration for real data
- [ ] User authentication and multi-tenancy
- [ ] Real-time data processing with WebSockets
- [ ] Advanced filtering and custom date ranges
- [ ] Session recording and replay
- [ ] Heatmap visualizations
- [ ] A/B testing integration
- [ ] Email report scheduling
- [ ] Mobile app companion
- [ ] White-label customization options

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/) - UI framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Recharts](https://recharts.org/) - Composable charting library
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Lucide](https://lucide.dev/) - Beautiful icon library
