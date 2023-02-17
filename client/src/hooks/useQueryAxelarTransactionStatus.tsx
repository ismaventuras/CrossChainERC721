import {
  AxelarGMPRecoveryAPI,
  Environment,
  GMPStatus,
} from "@axelar-network/axelarjs-sdk";
import { useEffect, useRef, useState } from "react";

// enum GMPStatus {
//     SRC_GATEWAY_CALLED = "source_gateway_called",
//     DEST_GATEWAY_APPROVED = "destination_gateway_approved",
//     DEST_EXECUTED = "destination_executed",
//     DEST_EXECUTE_ERROR = "destination_execute_error",
//     DEST_EXECUTING = "executing",
//     UNKNOWN_ERROR = "unknown_error",
//     CANNOT_FETCH_STATUS = "cannot_fetch_status"
//   }

export const useQueryAxelarTransactionStatus = (hash: string | undefined) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [destinationTx, setdestinationTx] = useState("");
  //
  //const [status, setStatus] = useState<string>("");
  const [error, setError] = useState();
  const sdk = new AxelarGMPRecoveryAPI({
    environment: Environment.TESTNET,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      if (hash) {
        try {
          const txStatus = await sdk.queryTransactionStatus(hash);
          if (txStatus.status !== GMPStatus.DEST_EXECUTED) {
            setIsLoading(true);
          } else {
            setdestinationTx(txStatus.executed.transactionHash);
            setIsLoading(false);
            setIsSuccess(true);
            clearInterval(interval);
          }
        } catch (err: any) {
          setError(err.message);
          setIsError(true);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [hash]);

  return {
    error,
    destinationTx,
    isLoading,
    isSuccess,
    isError,
  };
};
