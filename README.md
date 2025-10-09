# FlowIQ 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![React](https://img.shields.io/badge/React-18.x-blue.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)]()
[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://pranayk07.github.io/FlowIQ/)

**FlowIQ** is a web-based tool designed to help determine optimal exit points in trading strategies. It provides advanced algorithms, interactive visualizations, comprehensive backtesting, and decision support to help traders make informed exit decisions.

---

## 📑 Table of Contents

- [Features](#-features)  
- [Motivation](#-motivation)  
- [Architecture / Design](#-architecture--design)  
- [Installation](#-installation)  
- [Usage](#-usage)  
- [Examples](#-examples)  
- [Configuration](#-configuration)  
- [Testing](#-testing)  
- [Contributing](#-contributing)  
- [Roadmap / Future Work](#-roadmap--future-work)  
- [License](#-license)  
- [Acknowledgements](#-acknowledgements)  

---

## ✨ Features

- Compute candidate exit points using multiple algorithms/heuristics  
- Visualize price/metric charts with annotated exit signals  
- Backtest exit strategies on historical data  
- Alerts, thresholds, or auto‑exit triggers  
- Support for different data sources (CSV, API, live feeds)  
- Logging, metrics, and debugging capabilities  

---

## 💡 Motivation

Why this project exists:

- No unified, beginner-friendly tool for evaluating exit strategies  
- Provides a flexible and extensible framework for experimenting with heuristics  
- Reduces emotional bias in exit decision-making  
- Encourages learning and experimentation with models  

---

## 🏗 Architecture / Design

```
FlowIQ/
├── src/
│   ├── pages/
│   │   ├── TradingIndex.tsx      # Landing page
│   │   ├── TradingDashboard.tsx  # Main trading dashboard
│   │   └── Features.tsx          # Features page
│   ├── utils/
│   │   ├── exitAlgorithms.ts     # Exit point algorithms (RSI, MA, Trend, Bollinger)
│   │   ├── backtesting.ts        # Backtesting engine
│   │   └── dataLoader.ts         # CSV parsing and data generation
│   ├── types/
│   │   └── trading.ts            # TypeScript type definitions
│   └── components/
│       └── ui/                   # Reusable UI components
├── public/                       # Static assets
└── dist/                         # Production build
```

- **pages/**: Main application pages and routes
- **utils/**: Core logic for exit algorithms, backtesting, and data processing
- **types/**: TypeScript interfaces and type definitions
- **components/**: Reusable UI components built with React and shadcn/ui  

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

```bash
# Basic run
python src/main.py --input data/sample_prices.csv --output results/output.png

# Example run
python examples/sample_run.py
```

Or import into your own Python scripts:

```python
from src.core.exit_algorithms import compute_exit_points
from src.data.loader import load_csv_data

data = load_csv_data("data/sample.csv")
exits = compute_exit_points(data)
```

### Command Line Options

| Argument         | Description                                  | Default         |
|------------------|----------------------------------------------|-----------------|
| `--input`        | Input data file path (e.g. CSV)              | Required        |
| `--output`       | Path to store output/plots                   | `./output.png`  |
| `--algorithm`    | Exit algorithm to use (e.g. “rsi”, “trend”)  | “rsi”           |
| `--threshold`    | Numeric threshold parameter                  | 0.05            |
| `--verbose`      | Enable verbose logging                       | `False`         |

---

## 📊 Examples

### Web Interface

1. Visit [https://pranayk07.github.io/FlowIQ/](https://pranayk07.github.io/FlowIQ/)
2. Click "Launch App" to access the Trading Dashboard
3. Select an algorithm (e.g., RSI, Moving Average)
4. Use the sample data or upload your own CSV file
5. View the interactive chart with exit signals
6. Check the backtest results tab for performance metrics

### Sample CSV Format

```csv
date,open,high,low,close,volume
2024-01-01,100.00,102.50,99.50,101.25,1000000
2024-01-02,101.25,103.00,100.75,102.50,1200000
2024-01-03,102.50,104.00,102.00,103.75,950000
```

---

## 🛠 Configuration

The application can be configured through the web interface:

- **Algorithm Selection**: Choose from RSI, Moving Average, Trend Analysis, or Bollinger Bands
- **Parameters**: Adjust thresholds and periods for each algorithm
- **Data Source**: Upload CSV files or use generated sample data
- **Export Options**: Download exit signals and backtest results

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

- More exit strategies and heuristics  
- Real-time exit detection  
- Trading API integrations  
- Richer visualization (dashboards, heatmaps)  
- GUI or web dashboard  
- Performance optimizations  

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- Open-source libraries used in this project  
- Inspiration from trading analysis frameworks  
- All contributors and testers
