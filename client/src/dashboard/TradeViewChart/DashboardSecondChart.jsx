/* eslint-disable no-new */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

let tvScriptLoadingPromise;
const DashboardSecondChart = () => {
  const { pair } = useParams();
  const onLoadScriptRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        // eslint-disable-next-line operator-linebreak
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        // eslint-disable-next-line operator-linebreak
        document.getElementById("tradingview_0d99a") &&
        "TradingView" in window
      ) {
        // eslint-disable-next-line new-cap
        new window.TradingView.widget({
          width: "100%",
          height: 610,
          symbol: `${pair?.toUpperCase()}USDT`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_0d99a",
          withdateranges: true,
          range: "YTD",
          hide_side_toolbar: false,
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          hide_legend: true,
        });
      }
    }
  }, [pair]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_0d99a" />
      {/* <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="blue-text">AAPL stock chart</span>
        </a>
        by TradingView
      </div> */}
    </div>
  );
};

export default DashboardSecondChart;
