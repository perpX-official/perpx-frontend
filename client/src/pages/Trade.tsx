import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Home,
  Settings,
  Wallet,
  ChevronDown,
  Search,
} from "lucide-react";
import { useState } from "react";

const markets = [
  { symbol: "BTC/USDC", price: "$94,523.45", change: "+2.34%", isUp: true },
  { symbol: "ETH/USDC", price: "$3,456.78", change: "+1.23%", isUp: true },
  { symbol: "SOL/USDC", price: "$145.67", change: "-0.45%", isUp: false },
  { symbol: "ARB/USDC", price: "$1.23", change: "+5.67%", isUp: true },
  { symbol: "OP/USDC", price: "$2.34", change: "+3.21%", isUp: true },
];

const positions = [
  {
    market: "BTC/USDC",
    side: "Long",
    size: "0.5 BTC",
    entryPrice: "$92,000",
    markPrice: "$94,523",
    pnl: "+$1,261.50",
    pnlPercent: "+2.74%",
    isProfit: true,
  },
];

export default function Trade() {
  const [leverage, setLeverage] = useState([10]);
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState<"long" | "short">("long");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-primary/10 bg-card">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src="/logo-icon.png" alt="PerpDEX" className="h-8 w-8" />
                  <img src="/logo-dark.png" alt="PerpDEX" className="h-5" />
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-primary">
                  Trade
                </Button>
                <Button variant="ghost" size="sm">
                  Earn
                </Button>
                <Button variant="ghost" size="sm">
                  Analytics
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Button variant="ghost" size="sm">EN</Button>
                <span className="text-muted-foreground">|</span>
                <Button variant="ghost" size="sm">JP</Button>
                <span className="text-muted-foreground">|</span>
                <Button variant="ghost" size="sm">CN</Button>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Market List */}
        <div className="w-64 border-r border-primary/10 bg-card overflow-y-auto">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search markets..."
                className="pl-9 bg-background border-primary/20"
              />
            </div>
            
            <div className="space-y-1">
              {markets.map((market) => (
                <button
                  key={market.symbol}
                  className="w-full p-3 rounded-lg hover:bg-background transition-colors text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{market.symbol}</span>
                    <Badge
                      variant={market.isUp ? "default" : "destructive"}
                      className={market.isUp ? "bg-green-500/20 text-green-500" : ""}
                    >
                      {market.change}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{market.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Chart Area */}
        <div className="flex-1 flex flex-col">
          {/* Market Header */}
          <div className="border-b border-primary/10 bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold">BTC/USDC</h2>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-primary">$94,523.45</span>
                    <Badge className="bg-green-500/20 text-green-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.34%
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-6 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">24h High</div>
                  <div className="font-semibold">$95,234.56</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">24h Low</div>
                  <div className="font-semibold">$92,123.45</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">24h Volume</div>
                  <div className="font-semibold">$1.2B</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Open Interest</div>
                  <div className="font-semibold">$456M</div>
                </div>
              </div>
            </div>
          </div>

          {/* TradingView Chart Placeholder */}
          <div className="flex-1 bg-background p-4">
            <Card className="h-full bg-card border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">TradingView Chart</h3>
                <p className="text-muted-foreground">
                  Advanced charting powered by TradingView
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  (Integration placeholder - connect TradingView widget here)
                </p>
              </div>
            </Card>
          </div>

          {/* Bottom Panel - Positions/Orders */}
          <div className="border-t border-primary/10 bg-card">
            <Tabs defaultValue="positions" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-primary/10 bg-transparent p-0">
                <TabsTrigger value="positions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Positions
                </TabsTrigger>
                <TabsTrigger value="orders" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Open Orders
                </TabsTrigger>
                <TabsTrigger value="history" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Trade History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="positions" className="p-4">
                {positions.length > 0 ? (
                  <div className="space-y-2">
                    {positions.map((position, idx) => (
                      <Card key={idx} className="bg-background border-primary/20">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-8 gap-4 items-center">
                            <div>
                              <div className="text-sm text-muted-foreground">Market</div>
                              <div className="font-semibold">{position.market}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Side</div>
                              <Badge className="bg-green-500/20 text-green-500">
                                {position.side}
                              </Badge>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Size</div>
                              <div className="font-semibold">{position.size}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Entry Price</div>
                              <div className="font-semibold">{position.entryPrice}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Mark Price</div>
                              <div className="font-semibold">{position.markPrice}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">PnL</div>
                              <div className="font-semibold text-green-500">
                                {position.pnl}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">PnL %</div>
                              <div className="font-semibold text-green-500">
                                {position.pnlPercent}
                              </div>
                            </div>
                            <div>
                              <Button variant="destructive" size="sm">
                                Close
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No open positions
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="orders" className="p-4">
                <div className="text-center py-8 text-muted-foreground">
                  No open orders
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="p-4">
                <div className="text-center py-8 text-muted-foreground">
                  No trade history
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar - Order Panel */}
        <div className="w-96 border-l border-primary/10 bg-card overflow-y-auto">
          <div className="p-4">
            {/* AI Insight Card */}
            <Card className="mb-4 bg-gradient-to-br from-secondary/20 to-primary/20 border-secondary/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-secondary" />
                  <span className="font-semibold text-sm">AI Insight</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  BTC showing strong bullish momentum. RSI at 68, support at $92k. Consider taking profit near $96k resistance.
                </p>
              </CardContent>
            </Card>

            {/* Order Type Tabs */}
            <Tabs defaultValue="market" className="w-full mb-4" onValueChange={setOrderType}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="limit">Limit</TabsTrigger>
                <TabsTrigger value="stop">Stop</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Long/Short Toggle */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                variant={side === "long" ? "default" : "outline"}
                className={side === "long" ? "bg-green-500 hover:bg-green-600" : ""}
                onClick={() => setSide("long")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Long
              </Button>
              <Button
                variant={side === "short" ? "default" : "outline"}
                className={side === "short" ? "bg-red-500 hover:bg-red-600" : ""}
                onClick={() => setSide("short")}
              >
                <TrendingDown className="h-4 w-4 mr-2" />
                Short
              </Button>
            </div>

            {/* Leverage Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Leverage</label>
                <span className="text-sm font-bold text-primary">{leverage[0]}x</span>
              </div>
              <Slider
                value={leverage}
                onValueChange={setLeverage}
                min={1}
                max={100}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1x</span>
                <span>25x</span>
                <span>50x</span>
                <span>100x</span>
              </div>
            </div>

            {/* Price Input (for Limit orders) */}
            {orderType === "limit" && (
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Limit Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-background border-primary/20"
                />
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Amount (USDC)</label>
              <Input
                type="number"
                placeholder="0.00"
                className="bg-background border-primary/20"
              />
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1">25%</Button>
                <Button variant="outline" size="sm" className="flex-1">50%</Button>
                <Button variant="outline" size="sm" className="flex-1">75%</Button>
                <Button variant="outline" size="sm" className="flex-1">100%</Button>
              </div>
            </div>

            {/* Order Summary */}
            <Card className="mb-4 bg-background border-primary/20">
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Balance</span>
                  <span className="font-semibold">0.00 USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position Size</span>
                  <span className="font-semibold">0.00 BTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entry Price</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Liquidation Price</span>
                  <span className="font-semibold text-destructive">$0.00</span>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              className={`w-full ${
                side === "long"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              size="lg"
            >
              {side === "long" ? "Open Long" : "Open Short"}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Connect wallet to start trading
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

