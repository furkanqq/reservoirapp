import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { reservoirChains } from "@reservoir0x/reservoir-sdk";
import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { polygon } from "wagmi/chains";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [ publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  publicClient,
  webSocketPublicClient,
})

// const WagmiClient = "...";
const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReservoirKitProvider
      options={{
        apiKey: "d4b817c8-b14d-54fa-9938-adc9c4b90415",
        chains: [
          {
            ...reservoirChains.mainnet,
            active: false,
          },
          {
            ...reservoirChains.goerli,
            active: false,
          },
          {
            ...reservoirChains.polygon,
            active: true,
          },
          {
            ...reservoirChains.mumbai,
            active: false,
          },
          {
            ...reservoirChains.avalanche,
            active: false,
          },
          {
            ...reservoirChains.bsc,
            active: false,
          },
        ],
        // source: "opensea.io",
      }}
      theme={theme}
    >
      <WagmiConfig config={config}>
        <App />
        {/* <Test/> */}
      </WagmiConfig>
    </ReservoirKitProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
