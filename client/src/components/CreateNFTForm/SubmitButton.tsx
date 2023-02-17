import {  MOONBEAM_CHAINID } from "@/helpers/chains";
import {  MouseEvent,  useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { useNftFormContext } from "./context";

export default function SubmitButton({ipfs}: {ipfs:string}) {
  const [disabled, setDisabled] = useState(false);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const {toogleModal} = useNftFormContext()

  useEffect(() => {
    setDisabled(!(isConnected && chain?.id === MOONBEAM_CHAINID && Boolean(ipfs)));
  }, [isConnected, chain,ipfs]);

  const onClick = async (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toogleModal()
  }
  
  return (

      <button
        onClick={onClick}
        //type="submit"
        disabled={disabled}
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center disabled:opacity-25"
      >
        Mint
      </button>
  );

}
