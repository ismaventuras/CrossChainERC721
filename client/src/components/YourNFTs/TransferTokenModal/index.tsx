import SpinnerIcon from "@/components/Icons/SpinnerIcon";
import { getNameByChainId, VALID_CHAINS } from "@/helpers/chains";
import { CrossChainERC721ContractInfo } from "@/helpers/crossChainHelper";
import { useEstimateGasCrossChain } from "@/hooks/useEstimateGasCrossChain";
import { useQueryAxelarTransactionStatus } from "@/hooks/useQueryAxelarTransactionStatus";
import { Dialog, Transition } from "@headlessui/react";
import { BigNumber } from "ethers/lib/ethers";
import { Fragment, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import BlockExplorersTxBox from "./BlockExplorersTxBox";
import TransferForm from "./TransferForm";
import TransferNFTSteps from "./TransferNFTSteps";

function GasBox({ destChain, chainId }: { destChain: any; chainId: number }) {
  const { chain } = useNetwork();
  const source = getNameByChainId(chainId);
  const destination = getNameByChainId(destChain);
  const { gas, ether, isLoading } = useEstimateGasCrossChain(
    source,
    destination
  );

  return (
    <div className="mt-1">
      <p className="text-md text-gray-500 font-bold">Crosschain fee:</p>
      <p className="text-sm text-gray-500">
        {isLoading ? (
          <span className="flex justify-center">
            <SpinnerIcon />
          </span>
        ) : (
          `${parseFloat(ether).toFixed(5)} GLMR`
        )}
      </p>
    </div>
  );
}

export default function TransferTokenModal({
  isOpen,
  handleClose,
  tokenId,
  chainId,
}: {
  isOpen: boolean;
  handleClose: () => void;
  tokenId: BigNumber;
  chainId: number;
}) {
  const options = VALID_CHAINS.filter((chain) => chain !== chainId);
  const { address } = useAccount();
  const [destAddress, setDestAddress] = useState<string>(
    address ? address : ""
  );
  const [destChain, setDestChain] = useState<number>(options[0]);

  const { gas, ether, isLoading } = useEstimateGasCrossChain(
    getNameByChainId(chainId),
    getNameByChainId(destChain)
  );

  const { config } = usePrepareContractWrite({
    address: CrossChainERC721ContractInfo.address,
    abi: CrossChainERC721ContractInfo.abi,
    functionName: "transferRemote",
    args: [getNameByChainId(destChain as number), destAddress, tokenId],
    chainId: chainId,
    overrides: { value: gas },
  });

  const tx = useContractWrite(config);
  const receipt = useWaitForTransaction(tx.data?.hash);

  const {
    destinationTx,
    isLoading: isLoadingAxelar,
    isSuccess: isSuccessAxelar,
    isError: isErrorAxelar,
  } = useQueryAxelarTransactionStatus(tx.data?.hash);

  const updateDestAddress = (address: string) => {
    setDestAddress(address);
  };

  const updateDestChain = (chain: number) => {
    setDestChain(chain);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                  Transfer your token
                </Dialog.Title>

                <div>
                  <div className="border-t my-2">
                    <div className="flex justify-around gap-4 my-4">
                      <div>
                        <p className="text-md font-gray-700 font-semibold">
                          TokenId{" "}
                        </p>
                        <span className="text-gray-500">
                          #{tokenId.toNumber()}
                        </span>
                      </div>
                      <div>
                        <p className="text-md font-gray-700 font-semibold">
                          Chain{" "}
                        </p>
                        <span className="text-gray-500">
                          {getNameByChainId(chainId)}
                        </span>
                      </div>
                      <div>
                        <GasBox chainId={chainId} destChain={destChain} />
                      </div>
                    </div>
                  </div>

                  <TransferForm
                    chainId={chainId}
                    updateDestChain={updateDestChain}
                    updateDestAddress={updateDestAddress}
                    destAddress={destAddress}
                    tx={tx}
                  />
                  <TransferNFTSteps
                    tx={tx}
                    receipt={receipt}
                    isLoadingAxelar={isLoadingAxelar}
                    isSuccessAxelar={isSuccessAxelar}
                    isErrorAxelar={isErrorAxelar}
                    destinationTx={destinationTx}
                  />
                  <BlockExplorersTxBox
                    destChain={destChain}
                    destinationTx={destinationTx}
                    tx={tx}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
