import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronDown, Star, TrendingUp, TrendingDown } from "lucide-react";
import TradingViewChart from "@/components/TradingViewChart";
import { useLanguage } from "@/contexts/LanguageContext";

const TRADING_PAIRS = [
  { symbol: "BTCUSDT", name: "Bitcoin", price: 111062.6, change: 3.17, volume: "2.5B" },
  { symbol: "ETHUSDT", name: "Ethereum", price: 3842.5, change: 2.45, volume: "1.2B" },
  { symbol: "SOLUSDT", name: "Solana", price: 195.8, change: -1.23, volume: "850M" },
  { symbol: "BNBUSDT", name: "BNB", price: 612.3, change: 1.89, volume: "420M" },
  { symbol: "XRPUSDT", name: "Ripple", price: 0.5234, change: 4.56, volume: "680M" },
];

export default function Trade() {
  const { t } = useLanguage();
  const [selectedPair, setSelectedPair] = useState(TRADING_PAIRS[0]);
  const [showPairSelector, setShowPairSelector] = useState(false);
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market");
  const [marginMode, setMarginMode] = useState<"cross" | "isolated">("cross");
  const [leverage, setLeverage] = useState(25);
  const [activeTab, setActiveTab] = useState<"positions" | "orders" | "history" | "trades">("positions");
  const [tradeMode, setTradeMode] = useState<"perpetual" | "spot">("perpetual");
  const [amount, setAmount] = useState("");
  const [availableBalance] = useState(10000); // Mock balance

  const handlePercentageClick = (percent: number) => {
    const calculatedAmount = (availableBalance * percent) / 100;
    setAmount(calculatedAmount.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Perpetual/Spot Tabs */}
      <div className="bg-card/50 border-b border-white/5">
        <div className="flex">
          <button
            onClick={() => setTradeMode("perpetual")}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
              tradeMode === "perpetual"
                ? "border-primary text-white"
                : "border-transparent text-white/60"
            }`}
          >
            {t('trade.perpetual')}
          </button>
          <button
            onClick={() => setTradeMode("spot")}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
              tradeMode === "spot"
                ? "border-primary text-white"
                : "border-transparent text-white/60"
            }`}
          >
            {t('trade.spot')}
          </button>
        </div>
      </div>

      {/* Mobile Trading Interface */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pair Selector Header */}
        <div className="bg-card/50 border-b border-white/5 p-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowPairSelector(!showPairSelector)}
              className="flex items-center gap-2 hover:bg-white/5 rounded-lg p-2 transition-colors"
            >
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-white font-bold">{selectedPair.symbol}</span>
              <ChevronDown className="h-4 w-4 text-white/60" />
            </button>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{selectedPair.price.toLocaleString()}</div>
              <div className={`text-sm ${selectedPair.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {selectedPair.change >= 0 ? '+' : ''}{selectedPair.change}%
              </div>
            </div>
          </div>
          
          {/* Mark and Index Prices */}
          <div className="flex gap-4 mt-2 text-xs text-white/60">
            <div>
              <span>{t('trade.mark')}</span>
              <span className="ml-2 text-white">{selectedPair.price.toLocaleString()}</span>
            </div>
            <div>
              <span>{t('trade.index')}</span>
              <span className="ml-2 text-white">{selectedPair.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Pair Selector Dropdown */}
        {showPairSelector && (
          <div className="bg-card border-b border-white/5 max-h-60 overflow-y-auto">
            {TRADING_PAIRS.map((pair) => (
              <button
                key={pair.symbol}
                onClick={() => {
                  setSelectedPair(pair);
                  setShowPairSelector(false);
                }}
                className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <div className="flex items-center gap-2">
                  <Star className={`h-4 w-4 ${pair.symbol === selectedPair.symbol ? 'text-yellow-500' : 'text-white/20'}`} />
                  <div className="text-left">
                    <div className="text-white font-medium">{pair.symbol}</div>
                    <div className="text-xs text-white/60">{pair.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white">{pair.price.toLocaleString()}</div>
                  <div className={`text-xs ${pair.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {pair.change >= 0 ? '+' : ''}{pair.change}%
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Chart Section */}
        <div className="flex-shrink-0 bg-card/30 border-b border-white/5" style={{ height: '300px' }}>
          <TradingViewChart symbol={selectedPair.symbol} />
        </div>

        {/* Trading Panel */}
        <div className="flex-1 overflow-y-auto bg-background p-4 space-y-4">
          {/* Margin Mode and Leverage - Only for Perpetual */}
          {tradeMode === "perpetual" && (
            <div className="flex gap-2">
              <Button
                variant={marginMode === "cross" ? "default" : "outline"}
                onClick={() => setMarginMode("cross")}
                className="flex-1"
              >
                {t('trade.cross')}
              </Button>
              <Button
                variant={marginMode === "isolated" ? "default" : "outline"}
                onClick={() => setMarginMode("isolated")}
                className="flex-1"
              >
                {t('trade.isolated')}
              </Button>
              <Button variant="outline" className="px-4">
                {leverage}x
              </Button>
            </div>
          )}

          {/* Order Type Tabs */}
          <div className="flex gap-2 bg-card/30 rounded-lg p-1">
            <button
              onClick={() => setOrderType("market")}
              className={`flex-1 py-2 rounded-md transition-colors ${
                orderType === "market" ? "bg-primary text-white" : "text-white/60"
              }`}
            >
              {t('trade.market')}
            </button>
            <button
              onClick={() => setOrderType("limit")}
              className={`flex-1 py-2 rounded-md transition-colors ${
                orderType === "limit" ? "bg-primary text-white" : "text-white/60"
              }`}
            >
              {t('trade.limit')}
            </button>
            <button
              onClick={() => setOrderType("stop")}
              className={`flex-1 py-2 rounded-md transition-colors ${
                orderType === "stop" ? "bg-primary text-white" : "text-white/60"
              }`}
            >
              {t('trade.stopLimit')}
            </button>
          </div>

          {/* Price Input */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">{t('trade.price')}</label>
            <div className="relative">
              <Input
                type="number"
                value={selectedPair.price}
                readOnly={orderType === "market"}
                className="bg-card/50 border-white/10 text-white pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/60">
                {t('trade.mid')}
              </span>
            </div>
          </div>

          {/* Size Input */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">{t('trade.size')}</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-card/50 border-white/10 text-white pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/60">
                USDT
              </span>
            </div>
          </div>

          {/* Percentage Buttons */}
          <div className="flex gap-2">
            {[25, 50, 75, 100].map((percent) => (
              <Button 
                key={percent} 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handlePercentageClick(percent)}
              >
                {percent}%
              </Button>
            ))}
          </div>

          {/* Margin Info */}
          <div className="flex justify-between text-sm">
            <span className="text-white/60">{t('trade.margin')}</span>
            <div className="text-right">
              <span className="text-white">0.00</span>
              <span className="text-white/60 ml-2">{t('trade.max')}</span>
              <span className="text-white ml-2">0.0 USDT</span>
            </div>
          </div>

          {/* Buy/Sell Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button className="bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-bold">
              {tradeMode === "perpetual" ? t('trade.buyLong') : t('trade.buy')}
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-bold">
              {tradeMode === "perpetual" ? t('trade.sellShort') : t('trade.sell')}
            </Button>
          </div>
        </div>

        {/* Bottom Tabs */}
        <div className="bg-card/50 border-t border-white/5">
          <div className="flex">
            {[
              { key: "positions", label: t('trade.positions') },
              { key: "orders", label: t('trade.openOrders') },
              { key: "history", label: t('trade.orderHistory') },
              { key: "trades", label: t('trade.tradeHistory') },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-3 text-sm transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "border-primary text-white"
                    : "border-transparent text-white/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 min-h-[100px]">
            <div className="text-center text-white/40 py-8">
              {t('trade.noData').replace('{type}', activeTab)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
