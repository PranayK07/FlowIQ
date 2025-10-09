# FlowIQ Usage Guide

## Quick Start

1. Visit [https://pranayk07.github.io/FlowIQ/](https://pranayk07.github.io/FlowIQ/)
2. Click "Launch App" to access the Trading Dashboard
3. Explore exit strategies with sample data or upload your own

## Features Overview

### 1. Algorithm Selection

FlowIQ provides four powerful exit point algorithms:

#### RSI (Relative Strength Index)
- **Best for**: Identifying overbought and oversold conditions
- **Signals**: 
  - Buy when RSI crosses above 30 (oversold)
  - Sell when RSI crosses below 70 (overbought)
- **Parameters**: Oversold threshold (default: 30), Overbought threshold (default: 70)

#### Moving Average Crossover
- **Best for**: Trend following strategies
- **Signals**:
  - Buy (Golden Cross): Short MA crosses above Long MA
  - Sell (Death Cross): Short MA crosses below Long MA
- **Parameters**: Short period (default: 10), Long period (default: 30)

#### Trend Analysis
- **Best for**: Momentum-based exits
- **Signals**: Detects significant price movements over a lookback period
- **Parameters**: Threshold percentage (default: 3%)

#### Bollinger Bands
- **Best for**: Volatility-based trading
- **Signals**:
  - Buy when price touches lower band
  - Sell when price touches upper band
- **Parameters**: Period (default: 20), Standard deviations (default: 2)

### 2. Data Sources

#### Using Sample Data
- Click "Launch App" to start with pre-generated sample data
- 180 days of realistic price movements
- Perfect for testing and learning

#### Uploading CSV Files
1. Click "Upload CSV" button
2. Select a CSV file with OHLCV data
3. Ensure your CSV has these columns (case-insensitive):
   - `date` or `timestamp`: Date of the data point
   - `open`: Opening price
   - `high`: High price
   - `low`: Low price
   - `close`: Close price
   - `volume` (optional): Trading volume

**Example CSV Format:**
```csv
date,open,high,low,close,volume
2024-01-01,100.00,102.50,99.50,101.25,1000000
2024-01-02,101.25,103.00,100.75,102.50,1200000
```

### 3. Understanding the Dashboard

#### Configuration Panel
- **Algorithm Dropdown**: Select your exit strategy
- **Threshold Input**: Adjust parameters (visible for Trend algorithm)
- **Upload CSV**: Load your own data
- **Download Button**: Export results

#### Performance Metrics Cards
- **Total Return**: Overall profit/loss percentage
- **Win Rate**: Percentage of profitable trades
- **Max Drawdown**: Largest peak-to-trough decline
- **Sharpe Ratio**: Risk-adjusted return metric

#### Tabs

**Price Chart Tab**
- Line chart showing historical prices
- Green circles: Buy signals
- Red circles: Sell signals
- Interactive tooltips with price details

**Exit Signals Tab**
- Chronological list of all signals
- Signal type (BUY/SELL)
- Price at signal
- Confidence level (0-100%)
- Reasoning for the signal
- Color-coded (green for buy, red for sell)

**Backtest Results Tab**
- Strategy performance summary
- Trade statistics (total, winning, losing)
- Detailed trade history with P&L
- Entry and exit prices for each trade

### 4. Interpreting Results

#### Performance Metrics

**Win Rate**
- Above 60%: Excellent strategy
- 50-60%: Good strategy
- Below 50%: Strategy needs improvement

**Sharpe Ratio**
- Above 1.0: Good risk-adjusted returns
- 0.5-1.0: Acceptable
- Below 0.5: High risk relative to returns

**Max Drawdown**
- Lower is better
- Indicates worst-case loss scenario
- Important for risk management

**Total Return**
- Positive: Profitable strategy
- Negative: Loss-making strategy
- Compare across different algorithms

#### Signal Confidence
- 80-100%: High confidence, strong signal
- 50-80%: Medium confidence
- Below 50%: Low confidence, use caution

### 5. Best Practices

1. **Start with Sample Data**: Familiarize yourself with the interface
2. **Test Multiple Algorithms**: Different strategies work for different markets
3. **Review Trade History**: Understand why trades were profitable or not
4. **Consider Context**: Backtests show historical performance, not future results
5. **Compare Metrics**: Look at win rate, Sharpe ratio, and drawdown together
6. **Export Results**: Save signals and analysis for later review

### 6. Tips for Better Results

- **RSI**: Works best in ranging markets
- **Moving Average**: Best for trending markets
- **Trend Analysis**: Adjust threshold based on volatility
- **Bollinger Bands**: Effective in mean-reverting markets

### 7. Exporting Data

Click the download button (📥) to export:
- All exit signals with timestamps
- Signal types and confidence levels
- Reasoning for each signal
- Format: CSV file for easy analysis in Excel or other tools

### 8. Troubleshooting

**CSV Upload Fails**
- Ensure column names match the required format
- Check that date format is valid (YYYY-MM-DD recommended)
- Verify all numeric columns have valid numbers

**No Signals Generated**
- Try adjusting algorithm parameters
- Check that your data has sufficient price movement
- Ensure data covers an adequate time period

**Chart Not Displaying**
- Refresh the page
- Check browser console for errors
- Try with sample data first

### 9. Example Workflow

1. **Load Data**: Start with sample data or upload CSV
2. **Select Algorithm**: Choose RSI for first test
3. **Review Chart**: Observe buy/sell signals on price chart
4. **Check Metrics**: Note the win rate and total return
5. **Compare Strategies**: Switch to Moving Average
6. **Analyze Differences**: Compare which performs better
7. **Export Results**: Download signals for the best strategy
8. **Apply Insights**: Use findings to inform trading decisions

## Support

For issues, feature requests, or contributions:
- GitHub: [https://github.com/PranayK07/FlowIQ](https://github.com/PranayK07/FlowIQ)
- Create an issue or pull request

## License

FlowIQ is open source under the MIT License.
