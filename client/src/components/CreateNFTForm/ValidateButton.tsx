
export default function ValidateButton({ipfs,isLoading}:{ipfs:string,isLoading:boolean}) {
  return (
    <button
      disabled={isLoading || Boolean(ipfs)}
      type="submit"
      className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center disabled:opacity-25"
    >
      Validate Form
    </button>
  );
}
