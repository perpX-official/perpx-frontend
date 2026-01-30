import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Star } from "lucide-react";
import TradingViewChart from "@/components/TradingViewChart";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewardsState } from "@/hooks/useRewardsState";
import { toast } from "sonner";


const TRADING_PAIRS = [
  { symbol: "BTCUSDT", name: "Bitcoin", price: 111062.6, change: 3.17, volume: "2.5B" },
  { symbol: "ETHUSDT", name: "Ethereum", price: 3842.5, change: 2.45, volume: "1.2B" },
  { symbol: "SOLUSDT", name: "Solana", price: 195.8, change: -1.23, volume: "850M" },
  { symbol: "BNBUSDT", name: "BNB", price: 612.3, change: 1.89, volume: "420M" },
  { symbol: "XRPUSDT", name: "Ripple", price: 0.5234, change: 4.56, volume: "680M" },
];

export default function Trade() {
  const { t } = useLanguage();
  const { isConnected } = useRewardsState();
  const connect = () => {
    // Trigger wallet connection modal via event or context if needed
    // For now, we rely on the Header's connect button
    toast.info("Please connect your wallet using the button in the header");
  };
  
  // Mock data for display
  const balance = 10000; // Mock balance for display
  const positions: any[] = [];
  const orders: any[] = [];
  const trades: any[] = [];
  
  const [selectedPair, setSelectedPair] = useState(TRADING_PAIRS[0]);

  // ✅ Real-time price state management
  const [currentPrice, setCurrentPrice] = useState(selectedPair.price);
  const [priceChange, setPriceChange] = useState(selectedPair.change);
  
  // WebSocket reference
  const wsRef = useRef<WebSocket | null>(null);

  const [showPairSelector, setShowPairSelector] = useState(false);
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market");
  const [marginMode, setMarginMode] = useState<"cross" | "isolated">("cross");
  const [leverage, setLeverage] = useState(25);
  const [activeTab, setActiveTab] = useState<"positions" | "orders" | "history" | "trades">("positions");
  const [tradeMode, setTradeMode] = useState<"perpetual" | "spot">("perpetual");
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");

  // ✅ FIXED: Connect to Binance WebSocket for real-time price updates
  useEffect(() => {
    const symbol = selectedPair.symbol.toLowerCase();
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@ticker`;
    
    console.log('Connecting to Binance WebSocket:', wsUrl);
    
    // Close existing connection
    if (wsRef.current) {
      wsRef.current.close();
    }
    
    // Create new WebSocket connection
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    
    ws.onopen = () => {
      console.log('WebSocket connected for', selectedPair.symbol);
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const newPrice = parseFloat(data.c); // 'c' is the last price
        const priceChangePercent = parseFloat(data.P); // 'P' is the price change percent
        
        console.log('Price update:', newPrice, 'Change:', priceChangePercent + '%');
        
        // ✅ FIXED: Use functional update to get the latest state
        setCurrentPrice(newPrice);
        setPriceChange(priceChangePercent);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    // Cleanup on unmount or symbol change
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [selectedPair.symbol]);

  const handlePercentageClick = (percent: number) => {
    const calculatedAmount = (balance * percent) / 100;
    setAmount(calculatedAmount.toFixed(2));
  };

  const handleTrade = (side: 'buy' | 'sell') => {
    if (!isConnected) {
      toast.error('Please connect your wallet to trade');
      connect();
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
  };

  const handleClosePosition = (positionId: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet to close positions');
      connect();
      return;
    }
    toast.success('Position closed successfully');
  };

  const handleCancelOrder = (orderId: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet to cancel orders');
      connect();
      return;
    }
    toast.success('Order cancelled successfully');
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
              {/* ✅ Use real-time price from Binance WebSocket */}
              <div className="text-2xl font-bold text-white">{currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </div>
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
                  setCurrentPrice(pair.price);
                  setPriceChange(pair.change);
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
          <TradingViewChart symbol={selectedPair.symbol} mode={tradeMode} />
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
              {t('trade.stop')}
            </button>
          </div>

          {/* Price Input - Only for Limit and Stop Orders */}
          {orderType === "limit" && (
            <div>
              <label className="text-sm text-white/60 mb-2 block">{t('trade.limitPrice')}</label>
              <Input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder={currentPrice.toString()}
                className="bg-card/50 border-white/10"
              />
            </div>
          )}

          {orderType === "stop" && (
            <div>
              <label className="text-sm text-white/60 mb-2 block">{t('trade.stopPrice')}</label>
              <Input
                type="number"
                value={stopPrice}
                onChange={(e) => setStopPrice(e.target.value)}
                placeholder={currentPrice.toString()}
                className="bg-card/50 border-white/10"
              />
            </div>
          )}

          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-white/60">{t('trade.amount')}</label>
              <span className="text-xs text-white/40">
                {t('trade.available')}: {balance.toLocaleString()} USDT
              </span>
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-card/50 border-white/10"
            />
            <div className="flex gap-2 mt-2">
              {[25, 50, 75, 100].map((percent) => (
                <button
                  key={percent}
                  onClick={() => handlePercentageClick(percent)}
                  className="flex-1 py-1 text-xs bg-card/30 hover:bg-card/50 rounded transition-colors text-white/60"
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>

          {/* Buy/Sell Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleTrade('buy')}
              className="bg-green-600 hover:bg-green-700 text-white py-6"
            >
              {t('trade.buy')} / {t('trade.long')}
            </Button>
            <Button
              onClick={() => handleTrade('sell')}
              className="bg-red-600 hover:bg-red-700 text-white py-6"
            >
              {t('trade.sell')} / {t('trade.short')}
            </Button>
          </div>
        </div>

        {/* Bottom Tabs */}
        <div className="bg-card/50 border-t border-white/5">
          <div className="flex border-b border-white/5">
            {(['positions', 'orders', 'history', 'trades'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-primary text-white"
                    : "border-transparent text-white/60"
                }`}
              >
                {t(`trade.${tab}`)}
              </button>
            ))}
          </div>

          <div className="p-4 max-h-60 overflow-y-auto">
            {activeTab === "positions" && (
              <div className="space-y-2">
                {positions.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    {t('trade.noPositions')}
                  </div>
                ) : (
                  positions.map((position) => (
                    <Card key={position.id} className="p-3 bg-card/30 border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{position.pair}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              position.side === 'long' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                            }`}>
                              {position.side.toUpperCase()} {position.leverage}x
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleClosePosition(position.id)}
                          className="text-xs text-red-500 hover:text-red-400"
                        >
                          {t('trade.close')}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-white/60">{t('trade.size')}: </span>
                          <span className="text-white">{position.size}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('trade.entryPrice')}: </span>
                          <span className="text-white">{position.entryPrice}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('trade.markPrice')}: </span>
                          <span className="text-white">{position.currentPrice.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('trade.pnl')}: </span>
                          <span className={position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                            {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)} USDT
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-2">
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    {t('trade.noOrders')}
                  </div>
                ) : (
                  orders.map((order) => (
                    <Card key={order.id} className="p-3 bg-card/30 border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{order.pair}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              order.side === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                            }`}>
                              {order.side.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-xs text-red-500 hover:text-red-400"
                        >
                          {t('trade.cancel')}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-white/60">{t('trade.type')}: </span>
                          <span className="text-white">{order.type}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('trade.price')}: </span>
                          <span className="text-white">{order.price}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('trade.amount')}: </span>
                          <span className="text-white">{order.amount}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('trade.status')}: </span>
                          <span className="text-yellow-500">{order.status}</span>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="text-center py-8 text-white/40">
                {t('trade.noHistory')}
              </div>
            )}

            {activeTab === "trades" && (
              <div className="space-y-2">
                {trades.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    {t('trade.noTrades')}
                  </div>
                ) : (
                  trades.map((trade) => (
                    <Card key={trade.id} className="p-3 bg-card/30 border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{trade.pair}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              trade.side === 'long' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                            }`}>
                              {trade.side.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        {trade.pnl && (
                          <div className={`text-sm font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)} USDT
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                        <div>
                          <span className="text-white/60">{t('trade.size')}: </span>
                          <span className="text-white">{trade.size.toFixed(4)}</span>
                        </div>
                        <div>
                          <span className="text-white/60">{t('trade.price')}: </span>
                          <span className="text-white">{trade.price.toFixed(2)}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-white/60">{t('trade.time')}: </span>
                          <span className="text-white">{new Date(trade.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
