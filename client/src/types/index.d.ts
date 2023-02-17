import type { Dispatch, SetStateAction } from "react"
import type { useContractWrite, useWaitForTransaction } from "wagmi"

export type Address = `0x${string}`

export type NftFormContextType = {
    ipfs: string
    updateDestinationAddress: (address: Address) => void
    updateIpfs: (ipfs: string) => void
    updateselectedChain: (chainId: number) => void
    destinationAddress: string
    selectedChain: number
}

export type NftFormType = {
    name: string
    description: string
    file: string
    address: Address
    chain: number
}

export type NFTFormContextState = {
    //name:string
    //description:string
    address: string
    chain: number
    //file: File | null
}

export type Step = { isSuccess: boolean; isLoading: boolean, isError: boolean, text: string, error: string | undefined, successText: string }

type BlockExplorersTxBoxPropsType = { tx: ReturnType<typeof useContractWrite>, isCrossChain: boolean, destinationTx:string }
type BlockExplorersTransferTxBoxPropsType = { tx: ReturnType<typeof useContractWrite>, destinationTx:string, destChain:number }
type MintNFTSTepsPropsType = { 
    tx: ReturnType<typeof useContractWrite>, 
    receipt: ReturnType<typeof useWaitForTransaction>, 
    isCrossChain: boolean ,
    isErrorAxelar:boolean,
    isLoadingAxelar:boolean,
    isSuccessAxelar:boolean,
    destinationTx:string
}
type TransferNFTStepsPropsType = { 
    tx: ReturnType<typeof useContractWrite>, 
    receipt: ReturnType<typeof useWaitForTransaction>, 
    isErrorAxelar:boolean,
    isLoadingAxelar:boolean,
    isSuccessAxelar:boolean,
    destinationTx:string
}
type StartButtonPropsType = { tx: ReturnType<typeof useContractWrite> }
// type StartButtonPropsType = { tx: ReturnType<typeof useContractWrite>, setIpfs: Dispatch<SetStateAction<string>>, setIpfsError: Dispatch<SetStateAction<string>>, ipfs: string }