import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Settings,
  Menu,
  X,
} from "lucide-react";

const markets = [
  { symbol: "BTC/USDC", price: "112,238.5", change: "+2.45%", positive: true },
  { symbol: "ETH/USDC", price: "4,028.41", change: "+1.44%", positive: true },
  { symbol: "SOL/USDC", price: "245.67", change: "-0.82%", positive: false },
  { symbol: "ARB/USDC", price: "1.234", change: "+5.23%", positive: true },
  { symbol: "OP/USDC", price: "2.567", change: "+3.12%", positive: true },
];

const orderBook = [
  { price: "112,238.96", size: "0.0157", total: "116.16" },
  { price: "112,238.91", size: "0.0472", total: "116.14" },
  { price: "112,238.87", size: "0.2783", total: "76.09" },
  { price: "112,238.85", size: "0.0616", total: "75.82" },
  { price: "112,238.84", size: "24.8370", total: "75.75" },
];

export default function Trade() {
  const [leverage, setLeverage] = useState([10]);
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState<"long" | "short">("long");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-card">
        <div className="px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link href="/">
                <a className="flex items-center gap-2">
                  <img src="/logo-icon.png" alt="PerpX" className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="text-base sm:text-lg font-bold text-white">PerpX</span>
                </a>
              </Link>
              <div className="hidden md:flex items-center gap-4 sm:gap-6 ml-4 sm:ml-8">
                <Link href="/trade"><a className="text-xs sm:text-sm text-primary font-semibold">Trade</a></Link>
                <Link href="/dashboard"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Dashboard</a></Link>
                <Link href="/points"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Points</a></Link>
                <Link href="/referral"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Referral</a></Link>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white/80 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-white/10 p-4">
          <div className="flex flex-col gap-3">
            <Link href="/trade"><a className="text-sm text-primary font-semibold">Trade</a></Link>
            <Link href="/dashboard"><a className="text-sm text-white/60">Dashboard</a></Link>
            <Link href="/points"><a className="text-sm text-white/60">Points</a></Link>
            <Link href="/referral"><a className="text-sm text-white/60">Referral</a></Link>
          </div>
        </div>
      )}

      {/* Market Info Bar */}
      <div className="border-b border-white/10 bg-card">
        <div className="px-3 sm:px-4 py-2 sm:py-3 overflow-x-auto">
          <div className="flex items-center gap-3 sm:gap-6 min-w-max">
            <div>
              <div className="text-xs text-white/60">Mark Price</div>
              <div className="text-sm sm:text-base font-semibold text-white">$112,238.55</div>
            </div>
            <div>
              <div className="text-xs text-white/60">24h Change</div>
              <div className="text-sm sm:text-base font-semibold text-green-500">+2.45%</div>
            </div>
            <div>
              <div className="text-xs text-white/60">24h Volume</div>
              <div className="text-sm sm:text-base font-semibold text-white">$1.4B</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Open Interest</div>
              <div className="text-sm sm:text-base font-semibold text-white">$336.8M</div>
            </div>
            <div>
              <div className="text-xs text-white/60">1hr Funding</div>
              <div className="text-sm sm:text-base font-semibold text-white">-0.0002%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar - Markets (Hidden on mobile) */}
        <div className="hidden lg:block w-64 border-r border-white/10 bg-card overflow-y-auto">
          <div className="p-3">
            <Input
              placeholder="Search markets..."
              className="mb-3 bg-background border-white/10 text-sm"
            />
            <div className="space-y-1">
              {markets.map((market) => (
                <button
                  key={market.symbol}
                  className="w-full p-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white">{market.symbol}</span>
                    <span className={`text-xs ${market.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {market.change}
                    </span>
                  </div>
                  <div className="text-sm text-white/80">${market.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Chart Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Chart Placeholder */}
          <div className="flex-1 bg-card border-b border-white/10 p-3 sm:p-4">
            <div className="h-full bg-background/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-base sm:text-lg text-white/60 mb-2">TradingView Chart</div>
                <div className="text-xs sm:text-sm text-white/40">BTC/USDC • 5m</div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs - Positions/Orders */}
          <div className="bg-card border-t border-white/10">
            <Tabs defaultValue="positions" className="w-full">
              <div className="border-b border-white/10 px-3 sm:px-4">
                <TabsList className="bg-transparent h-auto p-0">
                  <TabsTrigger value="positions" className="text-xs sm:text-sm">Positions</TabsTrigger>
                  <TabsTrigger value="orders" className="text-xs sm:text-sm">Open Orders</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs sm:text-sm">Order History</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="positions" className="p-3 sm:p-4 m-0">
                <div className="text-center py-6 sm:py-8 text-white/60 text-sm">
                  No active positions
                </div>
              </TabsContent>
              <TabsContent value="orders" className="p-3 sm:p-4 m-0">
                <div className="text-center py-6 sm:py-8 text-white/60 text-sm">
                  No open orders
                </div>
              </TabsContent>
              <TabsContent value="history" className="p-3 sm:p-4 m-0">
                <div className="text-center py-6 sm:py-8 text-white/60 text-sm">
                  No order history
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar - Order Book & Trading Panel */}
        <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-card flex flex-col">
          {/* Order Book */}
          <div className="flex-1 p-3 border-b border-white/10 overflow-y-auto max-h-64 lg:max-h-none">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm font-semibold text-white">Order Book</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white/60">
                  <span className="text-xs">0.01</span>
                </Button>
              </div>
            </div>
            
            {/* Asks */}
            <div className="space-y-0.5 mb-2">
              {orderBook.map((order, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-red-500">{order.price}</span>
                  <span className="text-white/60">{order.size}</span>
                  <span className="text-white/40">{order.total}</span>
                </div>
              ))}
            </div>

            {/* Spread */}
            <div className="py-2 text-center">
              <span className="text-xs text-white/60">Spread: 0.20 (0.005%)</span>
            </div>

            {/* Bids */}
            <div className="space-y-0.5">
              {orderBook.map((order, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-green-500">{order.price}</span>
                  <span className="text-white/60">{order.size}</span>
                  <span className="text-white/40">{order.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Panel */}
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            {/* Order Type Tabs */}
            <Tabs value={orderType} onValueChange={setOrderType}>
              <TabsList className="w-full bg-background">
                <TabsTrigger value="market" className="flex-1 text-xs sm:text-sm">Market</TabsTrigger>
                <TabsTrigger value="limit" className="flex-1 text-xs sm:text-sm">Limit</TabsTrigger>
                <TabsTrigger value="stop" className="flex-1 text-xs sm:text-sm">Stop</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Long/Short Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={side === "long" ? "default" : "outline"}
                className={`${
                  side === "long"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "border-white/20 text-white/60 hover:bg-white/5"
                } text-xs sm:text-sm`}
                onClick={() => setSide("long")}
              >
                <TrendingUp className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Long
              </Button>
              <Button
                variant={side === "short" ? "default" : "outline"}
                className={`${
                  side === "short"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "border-white/20 text-white/60 hover:bg-white/5"
                } text-xs sm:text-sm`}
                onClick={() => setSide("short")}
              >
                <TrendingDown className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Short
              </Button>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-xs text-white/60 mb-1 block">Amount</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0000"
                  className="bg-background border-white/10 pr-16 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">
                  BTC
                </span>
              </div>
            </div>

            {/* Leverage Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-white/60">Leverage</label>
                <span className="text-xs sm:text-sm font-semibold text-white">{leverage[0]}x</span>
              </div>
              <Slider
                value={leverage}
                onValueChange={setLeverage}
                min={1}
                max={100}
                step={1}
                className="mb-1"
              />
              <div className="flex justify-between text-xs text-white/40">
                <span>1x</span>
                <span>100x</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-white/60">
                <span>Order Value:</span>
                <span>--</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Est. Liq. Price:</span>
                <span>--</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Fees:</span>
                <span>Taker: 0% | Maker: 0%</span>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              className={`w-full ${
                side === "long"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white text-sm sm:text-base`}
            >
              Connect Wallet to Trade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

