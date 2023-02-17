import {
  BLOCKEXPLORER_BY_CHAINID,
  getExplorerByChainId,
} from "@/helpers/chains";
import { BlockExplorersTransferTxBoxPropsType } from "@/types";
import { useNetwork } from "wagmi";

export default function BlockExplorersTxBox({
  tx,
  destinationTx,
  destChain,
}: BlockExplorersTransferTxBoxPropsType) {
  const { chain } = useNetwork();
  chain && BLOCKEXPLORER_BY_CHAINID[chain.id];
  return (
    <div className="mt-2 grid md:grid-cols-3 text-center gap-2">
      <>
        <a
          className=""
          href={
            tx.data?.hash
              ? ` ${chain && BLOCKEXPLORER_BY_CHAINID[chain.id]}tx/${
                  tx.data?.hash
                }`
              : undefined
          }
          target={"_blank"}
          rel="noreferrer"
        >
          <button
            disabled={Boolean(!tx.data?.hash)}
            className="disabled:opacity-25 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 shadow border-2 border-opacity-30 border-purple-400 rounded"
          >
            Transaction on source chain
          </button>
        </a>
        <>
          <a
            className=""
            href={
              tx.data?.hash
                ? ` https://axelarscan.io/gmp/${tx.data?.hash}`
                : undefined
            }
            target={"_blank"}
            rel="noreferrer"
          >
            <button
              disabled={Boolean(!tx.data?.hash)}
              className="disabled:opacity-25 text-orange-800 text-sm font-medium mr-2 px-2.5 py-0.5 shadow border-2 border-opacity-30 border-orange-400 rounded"
            >
              Transaction on axelar explorer
            </button>
          </a>
          <a
            className=""
            href={
              destinationTx
                ? ` ${getExplorerByChainId(destChain)}tx/${destinationTx}`
                : undefined
            }
            target={"_blank"}
            rel="noreferrer"
          >
            <button
              disabled={Boolean(!destinationTx)}
              className="disabled:opacity-25 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 shadow border-2 border-opacity-30 border-blue-400 rounded"
            >
              Transaction on destination chain
            </button>
          </a>
        </>
      </>
    </div>
  );
}
