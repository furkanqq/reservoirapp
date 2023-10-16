import React from "react";
import "./App.css";
import { BuyModal } from "@reservoir0x/reservoir-kit-ui";
import {
  useListings,
  useCollectionActivity,
  useTokens,
  useCollections,
  useUsersActivity,
  useTokenActivity,
} from "@reservoir0x/reservoir-kit-ui";
import { useConnect } from "wagmi";
import { getClient, Execute } from "@reservoir0x/reservoir-sdk";
import { createWalletClient, http, custom } from "viem";
import { ListModal } from "@reservoir0x/reservoir-kit-ui";

function App() {
  // const {
  //   data: listings1,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useListings({
  //   contracts: ["0x355b3cA2B5e8eA04e65C41b0EA73a88C4f39AC9a"],
  // });

  // const { data: tokens } = useTokens({
  //   tokens: ["0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb:1"],
  // });

  // const { data: collection } = useCollections({
  //   id: "0xa6551db26e8f54C7707A17Bd993a029592C0e4BB",
  //   // slug: "doubleeagle",
  // });

  // const { data: collectionActivity } = useCollectionActivity(
  //   "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"
  // );

  // const { data: userActivity } = useUsersActivity([
  //   "0x355b3cA2B5e8eA04e65C41b0EA73a88C4f39AC9a",
  // ]);

  // const { data: tokenActivity } = useTokenActivity(
  //   "0x744df993f93c89801cadbea8a4a3fd2b4a443d2c:1793"
  // );

  // console.log("listings1", listings1);
  // console.log("tokens", tokens);
  // console.log("collection", collection);
  // console.log("collectionActivity", collectionActivity);
  // console.log("userActivity", userActivity);
  // console.log("tokenActivity", tokenActivity);

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const address = "0x355b3cA2B5e8eA04e65C41b0EA73a88C4f39AC9a";

  const buyMe = () => {
    const wallet = createWalletClient({
      account: address,
      transport: custom(window.ethereum),
    });

    getClient()?.actions.buyToken({
      items: [
        {
          token: "0x068FC19F85605336A75b87DAd04acF8fA4F92E85:25",
          quantity: 1,
        },
      ],
      feesOnTopBps: ["0x33905203045DFA61C62451fe9516F4654a6517CB:100"], 
      // feesOnTopUsdt: ["0x33905203045DFA61C62451fe9516F4654a6517CB:0.01"], 

      wallet,
      onProgress: (steps) => {
        console.log(steps);
      },
    });
  };

  const listingMe = () => {
    const wallet = createWalletClient({
      account: address,
      transport: http(),
    });

    getClient()?.actions.listToken({
      listings: [
        {
          token: "0x068fc19f85605336a75b87dad04acf8fa4f92e85:1140",
          weiPrice: 10000000000000000,
          orderbook: "reservoir",
          orderKind: "seaport-v1.5",
          expirationTime: 1667403808616,
        },
      ],
      wallet,
      onProgress: (steps) => {
        console.log(steps);
      },
    });
  };
  
  return (
    <div className="App">
      <button onClick={buyMe}>Buy Me!</button>
      <button onClick={listingMe}>Listing Me!</button>
      <div>
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name} Connect
            {!connector.ready && " (unsupported)"}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
          </button>
        ))}
        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
}

export default App;
