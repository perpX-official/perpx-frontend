import { useEffect, useRef, memo } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  mode?: 'perpetual' | 'spot';
}

function TradingViewChart({ symbol = 'BTCUSDT', mode = 'perpetual' }: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    if (!container.current) return;

    // Clear previous widget safely
    if (container.current) {
      container.current.innerHTML = '';
    }

    // Check if TradingView script is already loaded
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
    
    const initWidget = () => {
      // Check if component is still mounted and container exists
      if (!isMountedRef.current || !container.current) return;
      
      if (typeof (window as any).TradingView !== 'undefined') {
        // Format symbol for TradingView
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
          console.error('Failed to initialize TradingView widget:', error);
        }
      }
    };

    if (existingScript) {
      // Script already loaded, just initialize widget
      initWidget();
    } else {
      // Load script for the first time
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.type = 'text/javascript';
      scriptRef.current = script;
      
      script.onload = initWidget;

      document.head.appendChild(script);
    }

    return () => {
      isMountedRef.current = false;
      
      // Safely remove widget
      if (widgetRef.current) {
        try {
          // Check if remove method exists and widget is still valid
          if (typeof widgetRef.current.remove === 'function') {
            widgetRef.current.remove();
          }
        } catch (error) {
          // Ignore cleanup errors - widget may already be removed
          console.debug('TradingView widget cleanup:', error);
        }
        widgetRef.current = null;
      }
      
      // Clear container content safely
      if (container.current) {
        container.current.innerHTML = '';
      }
      
      // Don't remove the script - it can be reused
      // This prevents the parentNode error when navigating
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
