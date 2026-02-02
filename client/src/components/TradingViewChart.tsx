import { useEffect, useRef, memo, useCallback, useState } from 'react';

interface TradingViewChartProps {
  symbol?: string;
  mode?: 'perpetual' | 'spot';
}

// Global flag to track script loading state
let scriptLoadPromise: Promise<void> | null = null;
let isScriptLoaded = false;

function loadTradingViewScript(): Promise<void> {
  if (isScriptLoaded) {
    return Promise.resolve();
  }
  
  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }
  
  scriptLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
    
    if (existingScript) {
      // Script tag exists, check if TradingView is available
      if (typeof (window as any).TradingView !== 'undefined') {
        isScriptLoaded = true;
        resolve();
        return;
      }
      // Script tag exists but not loaded yet, wait for it
      existingScript.addEventListener('load', () => {
        isScriptLoaded = true;
        resolve();
      });
      existingScript.addEventListener('error', reject);
      return;
    }
    
    // Create new script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.type = 'text/javascript';
    
    script.onload = () => {
      isScriptLoaded = true;
      resolve();
    };
    script.onerror = reject;
    
    document.head.appendChild(script);
  });
  
  return scriptLoadPromise;
}

function TradingViewChart({ symbol = 'BTCUSDT', mode = 'perpetual' }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const isMountedRef = useRef(true);
  const widgetIdRef = useRef<string>(`tv_widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [isLoading, setIsLoading] = useState(true);

  const cleanupWidget = useCallback(() => {
    // Just nullify the widget reference - don't try to manipulate DOM
    // TradingView widget will be garbage collected
    if (widgetRef.current) {
      widgetRef.current = null;
    }
    
    // Don't manually remove children - let React handle DOM cleanup
    // This prevents the removeChild errors
  }, []);

  const initWidget = useCallback(() => {
    // Double-check mount state and container existence
    if (!isMountedRef.current) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    if (typeof (window as any).TradingView === 'undefined') return;

    // Clean up any existing widget reference
    cleanupWidget();

    // Format symbol for TradingView
    const formattedSymbol = `BINANCE:${symbol}`;
    
    // Generate unique container ID for this instance
    const containerId = widgetIdRef.current;
    container.id = containerId;

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
        container_id: containerId,
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
      
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize TradingView widget:', error);
      setIsLoading(false);
    }
  }, [symbol, mode, cleanupWidget]);

  useEffect(() => {
    isMountedRef.current = true;
    setIsLoading(true);
    
    // Generate new unique ID for this mount
    widgetIdRef.current = `tv_widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Load script and initialize widget
    loadTradingViewScript()
      .then(() => {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          if (isMountedRef.current) {
            initWidget();
          }
        });
      })
      .catch((error) => {
        console.error('Failed to load TradingView script:', error);
        setIsLoading(false);
      });

    return () => {
      isMountedRef.current = false;
      // Just mark as unmounted - don't do DOM manipulation in cleanup
      cleanupWidget();
    };
  }, [symbol, mode, initWidget, cleanupWidget]);

  return (
    <div className="relative w-full h-full" style={{ minHeight: '400px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0e1a]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-white/60 text-sm">Loading chart...</span>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}

export default memo(TradingViewChart);
