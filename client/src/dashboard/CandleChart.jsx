/* eslint-disable react/jsx-no-target-blank */
// TradingViewWidget.jsx

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    // eslint-disable-next-line no-return-assign
    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        // eslint-disable-next-line operator-linebreak
        document.getElementById("tradingview_10ec1") &&
        "TradingView" in window
      ) {
        // eslint-disable-next-line no-new, new-cap
        new window.TradingView.widget({
          width: "100%",
          height: 600,
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          details: true,
          container_id: "tradingview_10ec1",
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_10ec1" />
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
          rel="noopener"
          target="_blank"
        >
          <span className="blue-text">AAPL stock chart</span>
        </a>
        by TradingView
      </div>
    </div>
  );
}
