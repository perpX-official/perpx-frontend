import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Star,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";

const markets = [
  { symbol: "BTCUSDT", price: "111,062.6", change: "+3.17%", positive: true },
  { symbol: "ETHUSDT", price: "4,030.1", change: "+2.76%", positive: true },
  { symbol: "SOLUSDT", price: "191.91", change: "+1.56%", positive: true },
  { symbol: "XRPUSDT", price: "2.4491", change: "+3.21%", positive: true },
  { symbol: "DOGEUSDT", price: "0.2006", change: "+3.53%", positive: true },
];

const orderBookAsks = [
  { price: "111,073.6", size: "1,110.8", sum: "4,116,250.1" },
  { price: "111,073.5", size: "165,355.9", sum: "4,115,139.3" },
  { price: "111,073.1", size: "89,969.3", sum: "3,952,083.4" },
  { price: "111,072.9", size: "111.1", sum: "3,862,114.1" },
  { price: "111,071.6", size: "84,969.8", sum: "3,862,003.0" },
];

const orderBookBids = [
  { price: "111,062.6", size: "111,063.0", sum: "" },
  { price: "111,062.6", size: "1,388,504.7", sum: "1,388,504.7" },
  { price: "111,057.2", size: "141,486.9", sum: "1,529,991.6" },
  { price: "111,056.9", size: "68,189.0", sum: "1,598,180.6" },
  { price: "111,056.7", size: "68,188.9", sum: "1,666,369.5" },
];

export default function Trade() {
  const [orderType, setOrderType] = useState("Market");
  const [marginType, setMarginType] = useState("Cross");
  const [leverage, setLeverage] = useState("25x");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Market Info Bar */}
      <div className="border-b border-white/10 bg-card">
        <div className="px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">BTCUSDT</span>
                <ChevronDown className="h-4 w-4 text-white/60" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-lg font-bold text-white">111,062.6</div>
                <div className="text-xs text-green-500">+3.17%</div>
              </div>
              <div>
                <div className="text-xs text-white/60">Mark</div>
                <div className="text-sm text-white">111,063.0</div>
              </div>
              <div>
                <div className="text-xs text-white/60">Index</div>
                <div className="text-sm text-white">111,091.0</div>
              </div>
              <div>
                <div className="text-xs text-white/60">Funding/Countdown</div>
                <div className="text-sm text-white">0.0100% / 03:19:18</div>
              </div>
              <div>
                <div className="text-xs text-white/60">24h volume</div>
                <div className="text-sm text-white">11.04B USDT</div>
              </div>
              <div>
                <div className="text-xs text-white/60">Open Interest</div>
                <div className="text-sm text-white">1.54B USDT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Markets */}
        <div className="hidden lg:block w-64 border-r border-white/10 bg-card overflow-y-auto">
          <div className="p-3">
            <Input
              placeholder="Search"
              className="mb-3 bg-background border-white/10 text-sm"
            />
            <div className="space-y-1">
              {markets.map((market) => (
                <button
                  key={market.symbol}
                  className="w-full p-2 hover:bg-white/5 rounded transition-colors text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white">{market.symbol}</span>
                    <span className={`text-xs ${market.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {market.change}
                    </span>
                  </div>
                  <div className="text-sm text-white/80">{market.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Chart Area */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 bg-card p-3 sm:p-4">
              <div className="h-full bg-background/50 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-base sm:text-lg text-white/60 mb-2">TradingView Chart</div>
                  <div className="text-xs sm:text-sm text-white/40">BTCUSDT • 1D</div>
                </div>
              </div>
            </div>

            {/* Bottom Tabs */}
            <div className="bg-card border-t border-white/10">
              <Tabs defaultValue="positions" className="w-full">
                <div className="border-b border-white/10 px-3 sm:px-4">
                  <TabsList className="bg-transparent h-auto p-0">
                    <TabsTrigger value="positions" className="text-xs sm:text-sm">Positions</TabsTrigger>
                    <TabsTrigger value="orders" className="text-xs sm:text-sm">Open orders</TabsTrigger>
                    <TabsTrigger value="history" className="text-xs sm:text-sm">Order history</TabsTrigger>
                    <TabsTrigger value="trade" className="text-xs sm:text-sm">Trade history</TabsTrigger>
                    <TabsTrigger value="transaction" className="text-xs sm:text-sm">Transaction history</TabsTrigger>
                    <TabsTrigger value="deposits" className="text-xs sm:text-sm">Deposits & withdrawals</TabsTrigger>
                    <TabsTrigger value="assets" className="text-xs sm:text-sm">Assets</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="positions" className="p-3 sm:p-4 m-0">
                  <div className="text-center py-6 sm:py-8 text-white/60 text-sm">
                    No positions
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
                <TabsContent value="trade" className="p-3 sm:p-4 m-0">
                  <div className="text-center py-6 sm:py-8 text-white/60 text-sm">
                    No trade history
                  </div>
                </TabsContent>
                <TabsContent value="transaction" className="p-3 sm:p-4 m-0">
                  <div className="text-center py-6 sm:py-8 text-white/60 text-sm">
                    No transaction history
                  </div>
                </TabsContent>
                <TabsContent value="deposits" className="p-3 sm:p-4 m-0">
                  <div className="text-center py-6 sm:py-8 text-white/60 text-sm">
                    No deposits or withdrawals
                  </div>
                </TabsContent>
                <TabsContent value="assets" className="p-3 sm:p-4 m-0">
                  <div className="text-center py-6 sm:py-8 text-white/60 text-sm">
                    No assets
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar - Order Book & Trading Panel */}
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-card flex flex-col">
            {/* Order Book & Trades Tabs */}
            <Tabs defaultValue="orderbook" className="flex-1 flex flex-col">
              <div className="border-b border-white/10 px-3 sm:px-4">
                <TabsList className="bg-transparent h-auto p-0">
                  <TabsTrigger value="orderbook" className="text-xs sm:text-sm">Order book</TabsTrigger>
                  <TabsTrigger value="trades" className="text-xs sm:text-sm">Trades</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="orderbook" className="flex-1 p-3 overflow-y-auto m-0">
                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <span>Price (USDT)</span>
                  <span>Size (USDT)</span>
                  <span>Sum (USDT)</span>
                </div>

                {/* Asks */}
                <div className="space-y-0.5 mb-2">
                  {orderBookAsks.map((order, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-red-500">{order.price}</span>
                      <span className="text-white/60">{order.size}</span>
                      <span className="text-white/40">{order.sum}</span>
                    </div>
                  ))}
                </div>

                {/* Current Price */}
                <div className="py-2 text-center border-y border-white/10 my-2">
                  <span className="text-lg font-bold text-green-500">111,062.6 ↑</span>
                </div>

                {/* Bids */}
                <div className="space-y-0.5">
                  {orderBookBids.map((order, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-green-500">{order.price}</span>
                      <span className="text-white/60">{order.size}</span>
                      <span className="text-white/40">{order.sum}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trades" className="flex-1 p-3 overflow-y-auto m-0">
                <div className="text-center py-8 text-white/60 text-sm">
                  No recent trades
                </div>
              </TabsContent>
            </Tabs>

            {/* Trading Panel */}
            <div className="border-t border-white/10 p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Margin Type & Leverage */}
              <div className="flex items-center gap-2">
                <Button
                  variant={marginType === "Cross" ? "default" : "outline"}
                  size="sm"
                  className={`flex-1 text-xs ${
                    marginType === "Cross"
                      ? "bg-primary text-white"
                      : "border-white/20 text-white/60"
                  }`}
                  onClick={() => setMarginType("Cross")}
                >
                  Cross
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/20 text-white/60 text-xs"
                >
                  {leverage}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white/60 text-xs"
                >
                  M
                </Button>
              </div>

              {/* Order Type Tabs */}
              <div className="flex gap-2">
                {["Market", "Limit", "Stop Limit"].map((type) => (
                  <Button
                    key={type}
                    variant={orderType === type ? "default" : "outline"}
                    size="sm"
                    className={`flex-1 text-xs ${
                      orderType === type
                        ? "bg-primary text-white"
                        : "border-white/20 text-white/60"
                    }`}
                    onClick={() => setOrderType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>

              {/* Price Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-white/60">Price (USDT)</label>
                  <span className="text-xs text-white/60">Avbl 0.00 USDT</span>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    value="111073.6"
                    className="bg-background border-white/10 text-sm pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">
                    Mid
                  </span>
                </div>
              </div>

              {/* Size Input */}
              <div>
                <label className="text-xs text-white/60 mb-1 block">Size</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="0"
                    className="bg-background border-white/10 text-sm pr-16"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs text-white/60"
                  >
                    USDT
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Percentage Slider */}
              <div className="flex gap-1">
                {["0%", "25%", "50%", "75%", "100%"].map((pct) => (
                  <button
                    key={pct}
                    className="flex-1 py-1 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                  >
                    {pct}
                  </button>
                ))}
              </div>

              {/* Advanced Options */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-white/60">
                  <input type="checkbox" className="rounded" />
                  TP/SL
                </label>
                <label className="flex items-center gap-2 text-xs text-white/60">
                  <input type="checkbox" className="rounded" />
                  Hidden Order
                </label>
                <label className="flex items-center gap-2 text-xs text-white/60">
                  <input type="checkbox" className="rounded" />
                  Reduce-Only
                </label>
              </div>

              {/* Order Summary */}
              <div className="space-y-1 text-xs pt-2 border-t border-white/10">
                <div className="flex justify-between text-white/60">
                  <span>Liq.Price --</span>
                  <span>Liq.Price --</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Margin 0.00</span>
                  <span>Margin 0.00</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Max 0.0 USDT</span>
                  <span>Max 0.0 USDT</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Fees</span>
                  <span>----</span>
                </div>
              </div>

              {/* Buy/Sell Buttons */}
              <Button className="w-full bg-primary hover:bg-primary/90 text-white text-sm">
                Connect wallet
              </Button>
            </div>

            {/* Account Section */}
            <div className="border-t border-white/10 p-3 sm:p-4">
              <div className="text-sm font-semibold text-white mb-3">Account</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white/60 text-xs">
                  Deposit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white/60 text-xs">
                  Withdraw
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white/60 text-xs">
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

