import type { StartButtonPropsType } from "@/types";
import {  useState } from "react";



export default function StartButton({tx}: StartButtonPropsType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);



  const onClick = async (e: any) => {
    try {
      setIsLoading(true);      
      await tx.writeAsync?.()
      setIsSuccess(true);
    } catch (error: any) {

    } finally {
      setIsLoading(false);
    }    
  };

  return (
      <button
        disabled={isLoading || isSuccess}
        onClick={onClick}
        className="uppercase tracking-widest line w-full disabled:opacity-40 border rounded-lg shadow-sm  border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 "
      >
          Start
      </button>
  );
}
