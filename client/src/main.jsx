import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { bsc, bscTestnet, goerli } from "wagmi/chains";
import { Provider as ReduxProvider } from "react-redux";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import App from "./App";
import "./index.css";
import theme from "./theme";
import { store } from "./utils";
// Configure chains & providers with the Json provider.

const { chains, provider } = configureChains(
  [bsc, bscTestnet, goerli],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://${chain.id}.example.com`,
      }),
    }),
  ]
);

// Set up client
const client = createClient({
  // autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WagmiConfig client={client}>
          <App />
        </WagmiConfig>
      </ThemeProvider>
    </BrowserRouter>
  </ReduxProvider>
  // </React.StrictMode>
);
