import { ARBITRUM_CHAINID, MOONBEAM_CHAINID, POLYGON_CHAINID } from "@/helpers/chains";
import { ChangeEvent } from "react";
import { useNftFormContext } from "../context";

export default function BlockchainSelectInput() {
  const {updateChain, chain} = useNftFormContext()
  return (
    <div className="">
      <label htmlFor="select-blockchain-input" className="block mb-2 text-sm font-medium text-gray-900"
      >
        Mint on
      </label>
      <select
        required
        name="chain"
        id="select-blockchain-input"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e:ChangeEvent<HTMLSelectElement>) => updateChain(+e.target.value)}
        value={chain}
      >
        <option value={MOONBEAM_CHAINID}>Moonbeam</option>
        <option value={POLYGON_CHAINID}>Polygon (Cross Chain)</option>
        <option value={ARBITRUM_CHAINID}>Arbitrum (Cross Chain)</option>
      </select>
    </div>
  );
}
