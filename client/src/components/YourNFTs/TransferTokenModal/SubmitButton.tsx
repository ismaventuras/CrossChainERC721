import { useContractWrite } from "wagmi";

export default function SubmitButton({
  tx,
}: {
  tx: ReturnType<typeof useContractWrite>;
}) {
  const { write, writeAsync } = tx;

  const onClick = async (e: any) => {
    e.preventDefault();
    await writeAsync?.();
  };

  return (
    <button
      disabled={!write}
      onClick={onClick}
      className="w-full my-2 text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Transfer
    </button>
  );
}
