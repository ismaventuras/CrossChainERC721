import SpinnerIcon from "@/components/Icons/SpinnerIcon";
import { getNameByChainId } from "@/helpers/chains";
import { useSwitchNetwork } from "wagmi";

export default function SwitchWalletButton({ chainId }: { chainId: number }) {
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const onClick = (e: any) => {
    e.preventDefault();
    switchNetwork?.(chainId);
  };

  return (
    <>
      <button
        disabled={!switchNetwork}
        onClick={onClick}
        className="w-full my-2 text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {isLoading && pendingChainId === chainId ? (
          <div className="flex justify-center">
            <SpinnerIcon />
          </div>
        ) : (
          `Switch wallet to ${getNameByChainId(chainId)}`
        )}
      </button>
    </>
  );
}
