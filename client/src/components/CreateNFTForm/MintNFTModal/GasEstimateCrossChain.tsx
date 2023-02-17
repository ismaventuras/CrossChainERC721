import { MOONBEAM_CHAINID } from "@/helpers/chains";
import { useEstimateGasCrossChain } from "@/hooks/useEstimateGasCrossChain";
import { useNftFormContext } from "../context";
import SpinnerIcon from "../../Icons/SpinnerIcon";

export function GasEstimateCrossChain() {
    const { gas, ether, isLoading } = useEstimateGasCrossChain('moonbeam', 'polygon');
    const {chain} = useNftFormContext()
  
    const isXChain = chain !== MOONBEAM_CHAINID
    return (
      <div className="mt-1">
        <p className="text-md text-gray-500 font-bold">
          Crosschain fee: 
        </p>
        <p className="text-sm text-gray-500">
        {!isXChain ? "Not aplicable" : isLoading ? <span className="flex justify-center"><SpinnerIcon/></span> : `${parseFloat(ether).toFixed(5)} GLMR`} 
        </p>
      </div>
    );
  }