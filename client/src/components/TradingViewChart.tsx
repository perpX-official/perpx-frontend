import { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol?: string;
}

export default function TradingViewChart({ symbol = 'BINANCE:BTCUSDT' }: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).TradingView !== 'undefined') {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: '15',
          timezone: 'Asia/Tokyo',
          theme: 'dark',
          style: '1',
          locale: 'ja',
          toolbar_bg: '#0a0e1a',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: container.current?.id || 'tradingview_chart',
          backgroundColor: '#0a0e1a',
          gridColor: 'rgba(255, 255, 255, 0.06)',
          hide_top_toolbar: false,
          save_image: false,
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol]);

  return (
    <div
      id="tradingview_chart"
      ref={container}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}

