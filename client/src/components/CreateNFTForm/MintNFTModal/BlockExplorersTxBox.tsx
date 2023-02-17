import {  getExplorerByChainId } from "@/helpers/chains";
import { BlockExplorersTxBoxPropsType } from "@/types";
import { useNftFormContext } from "../context";

export default function BlockExplorersTxBox({isCrossChain, tx,destinationTx}:BlockExplorersTxBoxPropsType){
    const {chain} = useNftFormContext()
    return(
        <div className="mt-2 grid md:grid-cols-3 text-center gap-2">
        <>
          <a
            className=""
            href={tx.data?.hash ? ` https://moonscan.io/tx/${tx.data?.hash}` : undefined}
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
          {isCrossChain && (
            <>
          <a
            className=""
            href={tx.data?.hash ? ` https://axelarscan.io/gmp/${tx.data?.hash}` : undefined}
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
            href={destinationTx ? ` ${getExplorerByChainId(chain)}tx/${destinationTx}` : undefined}
            target={"_blank"}
            rel="noreferrer"
          >
            <button
              disabled={Boolean(destinationTx)}
              className="disabled:opacity-25 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 shadow border-2 border-opacity-30 border-blue-400 rounded"
            >
              Transaction on destination chain
            </button>
          </a>
            </>
          )}
        </>
      </div>
    )
}