import {  getNameByChainId, MOONBEAM_CHAINID } from "@/helpers/chains";
import { CrossChainERC721ContractInfo } from "@/helpers/crossChainHelper";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useNftFormContext } from "../context";
import MintNFTSteps from "../MintNFTSteps/MintNFTSteps";
import GasEstimate from "./GasEstimate";
import { GasEstimateCrossChain } from "./GasEstimateCrossChain";
import StartButton from "./StartButton";
import { useEstimateGasCrossChain } from "@/hooks/useEstimateGasCrossChain";
import { ethers } from "ethers";
import BlockExplorersTxBox from "./BlockExplorersTxBox";
import { useQueryAxelarTransactionStatus } from "@/hooks/useQueryAxelarTransactionStatus";

export default function MintNFTModal({ ipfs }: { ipfs: string }) {
  const { isOpenModal, toogleModal, chain, address } = useNftFormContext();
  const [isCrossChain, setIsCrossChain] = useState(false);

  const { gas } = useEstimateGasCrossChain(
    "moonbeam",
    getNameByChainId(chain)
  );

  useEffect(() => {
    chain !== MOONBEAM_CHAINID ? setIsCrossChain(true) : setIsCrossChain(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { config } = usePrepareContractWrite({
    address: CrossChainERC721ContractInfo.address,
    abi: CrossChainERC721ContractInfo.abi,
    functionName: chain !== MOONBEAM_CHAINID ? "mintRemote" : "mintNFT",
    args:
      chain !== MOONBEAM_CHAINID
        ? [getNameByChainId(chain), address, ipfs]
        : [address, ipfs],
    chainId: MOONBEAM_CHAINID,
    overrides: chain !== MOONBEAM_CHAINID ? { value: gas } : {},
  });

  const tx = useContractWrite(config);

  const receipt = useWaitForTransaction({ hash: tx.data?.hash });
  const {destinationTx, isLoading:isLoadingAxelar,isSuccess:isSuccessAxelar, isError:isErrorAxelar } = useQueryAxelarTransactionStatus(tx.data?.hash)

  const onClose = (e: any) => {
    toogleModal();
  };
  return (
    <>
      <>
        <Transition appear show={isOpenModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onClose}>
            {/* backdrop */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-80" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center font-medium leading-6 text-gray-900"
                    >
                      Validate your mint before sign
                    </Dialog.Title>
                    <div className="border-t my-4 grid md:grid-cols-4 grid-cols-2 text-center">
                      <div className="mt-1">
                        <p className="text-gray-500 font-bold">
                          Source
                        </p>
                        <p className="text-sm text-gray-500 ">moonbeam</p>
                      </div>

                      <div className="mt-1">
                        <p className=" text-gray-500 font-bold">
                          Destination
                        </p>
                        <p className="text-sm text-gray-500 ">{getNameByChainId(chain)}</p>
                      </div>
                      
                      <GasEstimate />
                      <GasEstimateCrossChain />
                    </div>
                    
                    <StartButton tx={tx} />
                    <MintNFTSteps
                      tx={tx}
                      receipt={receipt}
                      isCrossChain={isCrossChain}
                      isLoadingAxelar={isLoadingAxelar}
                      isSuccessAxelar={isSuccessAxelar}
                      isErrorAxelar={isErrorAxelar}
                      destinationTx={destinationTx}
                    />

                    <BlockExplorersTxBox tx={tx} isCrossChain={isCrossChain} destinationTx={destinationTx}/>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={toogleModal}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
}
