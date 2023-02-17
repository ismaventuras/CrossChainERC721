import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";

import "@rainbow-me/rainbowkit/styles.css";
import {  getDefaultWallets,  RainbowKitProvider ,  lightTheme} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {  polygonMumbai, arbitrumGoerli, polygon, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { moonbaseAlpha, moonbeam } from "@/helpers/wagmiChains";
import React from "react";

// wagmi - rainbow
const { chains, provider, webSocketProvider } = configureChains(
  [moonbeam, polygon,arbitrum],
  [
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "CrossChainERC721",
  chains,
});
const wagmiClient = createClient({
  provider,
  webSocketProvider,
  connectors,
  autoConnect: true,
});

export default function App({ Component, pageProps }: AppProps) {
  //react query

  return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} modalSize="wide" theme={lightTheme({
          overlayBlur:'small',
          fontStack:'system',          
         })} >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
  );
}
