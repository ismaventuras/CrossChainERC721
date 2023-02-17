import { useEstimateMintNFTGas } from "@/hooks/useEstimateMintNFTGas";
import { useNftFormContext } from "../context";
import SpinnerIcon from "../../Icons/SpinnerIcon";

export default function GasEstimate() {
    const { chain } = useNftFormContext();
    const { gas, ether, isLoading } = useEstimateMintNFTGas(chain);
  
    return (
      <div className="mt-1">
        <p className="text-md text-gray-500 font-bold">
          Gas fee
        </p>
        <p className="text-sm text-gray-500">
        {isLoading ? <span className="flex justify-center"><SpinnerIcon/></span> : `${parseFloat(ether).toFixed(5)} GLMR`} 
        </p>
      </div>
    );
  }