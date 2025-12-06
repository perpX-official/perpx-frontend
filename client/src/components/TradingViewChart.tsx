import { useEffect, useRef, memo } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  mode?: 'perpetual' | 'spot';
}

function TradingViewChart({ symbol = 'BTCUSDT', mode = 'perpetual' }: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!container.current) return;

    let isMounted = true;

    // Clear previous widget
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.type = 'text/javascript';
    scriptRef.current = script;
    
    script.onload = () => {
      if (!isMounted) return;
      if (typeof (window as any).TradingView !== 'undefined' && container.current) {
        // Format symbol for TradingView
        // For perpetual: BINANCE:BTCUSDTPERP or BINANCE:BTCUSDT
        // For spot: BINANCE:BTCUSDT
        const formattedSymbol = mode === 'perpetual' 
          ? `BINANCE:${symbol}`
          : `BINANCE:${symbol}`;

        try {
          widgetRef.current = new (window as any).TradingView.widget({
            autosize: true,
            symbol: formattedSymbol,
            interval: '15',
            timezone: 'Asia/Tokyo',
            theme: 'dark',
            style: '1',
            locale: 'en',
            toolbar_bg: '#0a0e1a',
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            container_id: 'tradingview_widget',
            backgroundColor: '#0a0e1a',
            gridColor: 'rgba(255, 255, 255, 0.06)',
            hide_top_toolbar: false,
            save_image: false,
            studies: [
              'MASimple@tv-basicstudies',
            ],
            disabled_features: [
              'use_localstorage_for_settings',
              'header_symbol_search',
            ],
            enabled_features: [
              'study_templates',
              'side_toolbar_in_fullscreen_mode',
            ],
            overrides: {
              'paneProperties.background': '#0a0e1a',
              'paneProperties.backgroundType': 'solid',
              'paneProperties.vertGridProperties.color': 'rgba(255, 255, 255, 0.06)',
              'paneProperties.horzGridProperties.color': 'rgba(255, 255, 255, 0.06)',
              'scalesProperties.textColor': '#AAA',
              'mainSeriesProperties.candleStyle.upColor': '#22c55e',
              'mainSeriesProperties.candleStyle.downColor': '#ef4444',
              'mainSeriesProperties.candleStyle.borderUpColor': '#22c55e',
              'mainSeriesProperties.candleStyle.borderDownColor': '#ef4444',
              'mainSeriesProperties.candleStyle.wickUpColor': '#22c55e',
              'mainSeriesProperties.candleStyle.wickDownColor': '#ef4444',
            },
          });
        } catch (error) {
          console.error('TradingView widget creation error:', error);
        }
      }
    };

    document.head.appendChild(script);

    return () => {
      isMounted = false;
      
      // Safely remove widget
      if (widgetRef.current) {
        try {
          // Check if the container still exists in DOM before removing
          const widgetContainer = document.getElementById('tradingview_widget');
          if (widgetContainer && widgetContainer.parentNode && typeof widgetRef.current.remove === 'function') {
            widgetRef.current.remove();
          }
        } catch (error) {
          // Silently ignore cleanup errors
          console.warn('TradingView widget cleanup warning:', error);
        }
        widgetRef.current = null;
      }
      
      // Remove script
      if (scriptRef.current && scriptRef.current.parentNode) {
        try {
          scriptRef.current.parentNode.removeChild(scriptRef.current);
        } catch (error) {
          console.warn('Script cleanup warning:', error);
        }
      }
    };
  }, [symbol, mode]);

  return (
    <div
      id="tradingview_widget"
      ref={container}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}

export default memo(TradingViewChart);
