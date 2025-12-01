'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, DollarSign, AlertCircle, RefreshCw } from 'lucide-react'

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  signal: 'BREAKOUT' | 'PULLBACK' | 'WATCH'
  entry: number
  stopLoss: number
  target: number
  riskReward: string
  timeframe: string
}

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [capital, setCapital] = useState(100000)
  const [riskPercent, setRiskPercent] = useState(1)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    fetchStocks()
    const interval = setInterval(fetchStocks, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const fetchStocks = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/screener')
      const data = await response.json()
      setStocks(data.stocks)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching stocks:', error)
      // Demo data for initial display
      setStocks(generateDemoStocks())
    }
    setLoading(false)
  }

  const generateDemoStocks = (): Stock[] => {
    const symbols = [
      { symbol: 'RELIANCE', name: 'Reliance Industries' },
      { symbol: 'HDFCBANK', name: 'HDFC Bank' },
      { symbol: 'INFY', name: 'Infosys' },
      { symbol: 'TCS', name: 'Tata Consultancy Services' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank' },
      { symbol: 'SBIN', name: 'State Bank of India' },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel' },
      { symbol: 'ITC', name: 'ITC Limited' },
    ]

    return symbols.map(s => {
      const price = Math.random() * 2000 + 500
      const change = (Math.random() - 0.5) * 50
      const changePercent = (change / price) * 100
      const signal = Math.random() > 0.6 ? 'BREAKOUT' : Math.random() > 0.5 ? 'PULLBACK' : 'WATCH'
      const entry = price
      const stopLoss = price * 0.99
      const target = price * 1.02
      
      return {
        symbol: s.symbol,
        name: s.name,
        price: parseFloat(price.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        volume: Math.floor(Math.random() * 5000000) + 1000000,
        signal,
        entry: parseFloat(entry.toFixed(2)),
        stopLoss: parseFloat(stopLoss.toFixed(2)),
        target: parseFloat(target.toFixed(2)),
        riskReward: '1:2',
        timeframe: signal === 'BREAKOUT' ? '9:20-10:00 AM' : '10:30-2:00 PM'
      }
    })
  }

  const calculatePositionSize = (entry: number, stopLoss: number) => {
    const riskAmount = capital * (riskPercent / 100)
    const riskPerShare = entry - stopLoss
    const quantity = Math.floor(riskAmount / riskPerShare)
    return quantity
  }

  const breakoutStocks = stocks.filter(s => s.signal === 'BREAKOUT')
  const pullbackStocks = stocks.filter(s => s.signal === 'PULLBACK')
  const watchStocks = stocks.filter(s => s.signal === 'WATCH')

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Intraday Stock Screener
          </h1>
          <p className="text-gray-400">Real-time breakout & pullback opportunities for NSE/BSE</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            <button onClick={fetchStocks} className="ml-2 p-1 hover:bg-gray-700 rounded">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Risk Calculator */}
        <div className="card mb-8 bg-gray-800 border-gray-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Risk Calculator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Trading Capital (₹)</label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Risk Per Trade (%)</label>
              <input
                type="number"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                step="0.1"
                max="5"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-400">Max Risk Per Trade: <span className="text-white font-bold">₹{(capital * riskPercent / 100).toFixed(2)}</span></p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card bg-green-900/30 border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Breakout Signals</p>
                <p className="text-3xl font-bold text-green-400">{breakoutStocks.length}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <div className="card bg-blue-900/30 border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pullback Signals</p>
                <p className="text-3xl font-bold text-blue-400">{pullbackStocks.length}</p>
              </div>
              <TrendingDown className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <div className="card bg-yellow-900/30 border-yellow-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Watch List</p>
                <p className="text-3xl font-bold text-yellow-400">{watchStocks.length}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Breakout Opportunities */}
        {breakoutStocks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Breakout Opportunities (9:20-10:00 AM)
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {breakoutStocks.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} capital={capital} riskPercent={riskPercent} calculatePositionSize={calculatePositionSize} />
              ))}
            </div>
          </div>
        )}

        {/* Pullback Opportunities */}
        {pullbackStocks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-blue-400" />
              Pullback Opportunities (10:30-2:00 PM)
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {pullbackStocks.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} capital={capital} riskPercent={riskPercent} calculatePositionSize={calculatePositionSize} />
              ))}
            </div>
          </div>
        )}

        {/* Watch List */}
        {watchStocks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
              Watch List
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {watchStocks.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} capital={capital} riskPercent={riskPercent} calculatePositionSize={calculatePositionSize} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function StockCard({ stock, capital, riskPercent, calculatePositionSize }: any) {
  const quantity = calculatePositionSize(stock.entry, stock.stopLoss)
  const investment = quantity * stock.entry
  const potentialProfit = quantity * (stock.target - stock.entry)
  const potentialLoss = quantity * (stock.entry - stock.stopLoss)

  const signalColor = stock.signal === 'BREAKOUT' ? 'green' : stock.signal === 'PULLBACK' ? 'blue' : 'yellow'

  return (
    <div className={`card bg-gray-800 border-${signalColor}-700 hover:border-${signalColor}-500 transition-all`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">{stock.symbol}</h3>
            <span className={`badge-${stock.change >= 0 ? 'success' : 'danger'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${signalColor}-900 text-${signalColor}-300`}>
              {stock.signal}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-3">{stock.name}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Current Price</p>
              <p className="font-bold text-lg">₹{stock.price}</p>
            </div>
            <div>
              <p className="text-gray-500">Entry</p>
              <p className="font-bold text-green-400">₹{stock.entry}</p>
            </div>
            <div>
              <p className="text-gray-500">Stop Loss</p>
              <p className="font-bold text-red-400">₹{stock.stopLoss}</p>
            </div>
            <div>
              <p className="text-gray-500">Target</p>
              <p className="font-bold text-blue-400">₹{stock.target}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 min-w-[250px]">
          <p className="text-xs text-gray-400 mb-2">Position Details</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Quantity:</span>
              <span className="font-bold">{quantity} shares</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Investment:</span>
              <span className="font-bold">₹{investment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk/Reward:</span>
              <span className="font-bold text-green-400">{stock.riskReward}</span>
            </div>
            <div className="flex justify-between border-t border-gray-600 pt-2 mt-2">
              <span className="text-red-400">Max Loss:</span>
              <span className="font-bold text-red-400">₹{potentialLoss.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">Potential Profit:</span>
              <span className="font-bold text-green-400">₹{potentialProfit.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">⏰ {stock.timeframe}</p>
        </div>
      </div>
    </div>
  )
}