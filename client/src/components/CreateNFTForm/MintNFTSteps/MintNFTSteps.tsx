import { MintNFTSTepsPropsType, Step } from "@/types";
import ErrorIcon from "../../Icons/ErrorIcon";
import OkIcon from "../../Icons/OkIcon";
import PauseIcon from "../../Icons/PauseIcon";
import SpinnerIcon from "../../Icons/SpinnerIcon";

function Step({
  text,
  isSuccess,
  isError,
  isLoading,
  error,
  successText,
}: Step) {
  return (
    <>
      <li className="flex items-center pb-2 border-b">
        {isSuccess ? (
          <OkIcon />
        ) : isLoading ? (
          <SpinnerIcon />
        ) : isError ? (
          <ErrorIcon />
        ) : (
          <PauseIcon />
        )}
        <div className="flex flex-wrap gap-2">
          <p className="text-md">{text}</p>
          <p
            className={`${
              isError ? "text-red-500" : "text-green-500"
            } text-xs italic`}
          >
            {isError && error}
          </p>
        </div>
      </li>
    </>
  );
}

function CrossChainStep(){
  return(
    <>
    </>
  )
}



export default function MintNFTSteps({
  tx,
  receipt,
  isCrossChain,
  isErrorAxelar,
  isLoadingAxelar,
  isSuccessAxelar,
}: MintNFTSTepsPropsType) {

  // const sdk = new AxelarGMPRecoveryAPI({
  //   environment: Environment.TESTNET,
  // });


  //const {destinationTx, isLoading,isSuccess, isError } = useQueryAxelarTransactionStatus(tx.data?.hash)
  
  return (
    <div className="my-4 border-t">
      <h2 className="my-2 text-lg font-semibold text-gray-600 text-center">
        Transaction steps
      </h2>
      <div className="max-w-md  text-gray-500 list-inside mb-2 flex flex-col gap-2">
        <Step
          text="Sign transaction"
          isLoading={tx.isLoading}
          isError={tx.isError}
          isSuccess={tx.isSuccess}
          error={tx.error?.message}
          successText={"transaction submitted succesfully"}
        />
        <Step
          text="Confirm transaction"
          isLoading={receipt.isLoading}
          isError={receipt.isError}
          isSuccess={receipt.isSuccess}
          error={receipt.error?.message}
          successText={"transaction confirmed"}
        />
        {isCrossChain && (
          <>
            <Step
              text="Execute transaction on remote chain"
              isError={isErrorAxelar}
              isLoading={isLoadingAxelar}
              isSuccess={isSuccessAxelar}
              error={`Some error ocurred. Please visit https://axelarscan.io/gmp/${tx.data?.hash}`}
              successText={""}
            />
          </>
        )}
      </div>
    </div>
  );
}
