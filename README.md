# 📈 Intraday Stock Screener

AI-powered intraday stock screener for NSE/BSE markets. Find the best breakout and pullback opportunities with real-time signals, automatic risk calculation, and position sizing.

## 🚀 Features

### **Real-Time Stock Screening**
- **Breakout Detection** (9:20-10:00 AM) - Identifies first 15-min candle breakouts with high volume
- **Pullback Finder** (10:30-2:00 PM) - Detects stocks pulling back to EMA in uptrends
- **Watch List** - Stocks showing potential but waiting for confirmation

### **Smart Risk Management**
- **Position Size Calculator** - Auto-calculates quantity based on your capital and risk %
- **Risk/Reward Analysis** - Shows potential profit vs loss for each trade
- **Stop Loss & Target Levels** - Pre-calculated entry, SL, and target prices

### **Live Market Data**
- Real-time price updates
- Volume analysis
- Price change tracking
- Auto-refresh every minute

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/AshishDobariya2001/intraday-stock-screener.git

# Navigate to project directory
cd intraday-stock-screener

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy"

Your app will be live in minutes!

### Deploy to Render

1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Deploy!

## 📊 How to Use

1. **Set Your Capital** - Enter your trading capital in the Risk Calculator
2. **Set Risk %** - Choose how much you want to risk per trade (recommended: 1%)
3. **View Signals** - Check breakout and pullback opportunities
4. **Calculate Position** - See auto-calculated quantity, investment, and potential P&L
5. **Execute Trades** - Use the provided entry, SL, and target levels on your broker platform

## 🎯 Trading Strategy

### Breakout Strategy (9:20-10:00 AM)
- Wait for first 15-min candle completion
- Enter on breakout with 1.5x volume
- SL: Below breakout candle low
- Target: 1:2 risk-reward minimum

### Pullback Strategy (10:30-2:00 PM)
- Identify stocks in uptrend
- Wait for pullback to 15-min EMA
- Enter on bullish confirmation
- SL: Below recent swing low
- Target: 1:3 risk-reward minimum

## ⚠️ Important Notes

- **Demo Data**: Currently uses simulated data. For production, integrate with real market data APIs
- **Risk Warning**: Trading involves risk. Never risk more than you can afford to lose
- **Paper Trade First**: Test the strategy with paper trading before using real money
- **Market Hours**: NSE/BSE trading hours: 9:15 AM - 3:30 PM IST

## 🔧 Customization

### Add Real Market Data

Replace the demo data in `app/api/screener/route.ts` with real API calls:

```typescript
// Example: Integrate with Yahoo Finance, Alpha Vantage, or NSE API
const response = await fetch('YOUR_MARKET_DATA_API')
const data = await response.json()
```

### Modify Screening Logic

Edit the screening criteria in `app/api/screener/route.ts`:

```typescript
// Customize volume threshold, price action, indicators, etc.
if (changePercent > YOUR_THRESHOLD && volume > YOUR_VOLUME_CRITERIA) {
  signal = 'BREAKOUT'
}
```

## 📈 Future Enhancements

- [ ] Real-time NSE/BSE data integration
- [ ] Technical indicators (RSI, MACD, EMA)
- [ ] Historical performance tracking
- [ ] Trade journal integration
- [ ] Mobile app version
- [ ] Telegram/WhatsApp alerts
- [ ] Backtesting capabilities

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this for personal or commercial projects.

## 🙏 Acknowledgments

Built with ❤️ for Indian intraday traders.

---

**Disclaimer**: This tool is for educational purposes only. Trading in financial markets involves substantial risk. Always do your own research and consult with a financial advisor before making investment decisions.