import { ARBITRUM_CHAINID, MOONBEAM_CHAINID, POLYGON_CHAINID, VALID_CHAINS } from "@/helpers/chains";
import TokensOfChain from "./TokensOfChain";

export default function YourNFTs() {
  return (
    <>
      <TokensOfChain chainId={MOONBEAM_CHAINID}  />
      <TokensOfChain chainId={POLYGON_CHAINID}  />
      <TokensOfChain chainId={ARBITRUM_CHAINID}  />
      {/* {VALID_CHAINS.map((chain) => {
        return <TokensOfChain chainId={chain} key={chain} />;
      })} */}

    </>
  );
}
