import { getNameByChainId, VALID_CHAINS } from "@/helpers/chains";
import { useContractWrite, useNetwork } from "wagmi";
import SubmitButton from "./SubmitButton";
import SwitchWalletButton from "./SwitchWalletButton";

export default function TransferForm({
  chainId,
  updateDestChain,
  updateDestAddress,
  destAddress,
  tx,
}: {
  chainId: number;
  updateDestChain: (chain: number) => void;
  updateDestAddress: (address: string) => void;
  destAddress: string;
  tx: ReturnType<typeof useContractWrite>;
}) {
  const options = VALID_CHAINS.filter((chain) => chain !== chainId); //.map(chain => <option key={chain} value={chain}>{getNameByChainId(chain)}</option>)

  const { chain } = useNetwork();

  return (
    <form>
      <div className="border-t">
        <label
          htmlFor="block select-blockchain-input"
          className="mb-2 text-sm font-medium text-gray-900"
        >
          Select the chain where the NFT should be sent
        </label>
        <select
          defaultValue={options[0]}
          onChange={(e) => updateDestChain(+e.target.value)}
          name="chain"
          className="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
        >
          {options.map((chain) => (
            <option key={chain} value={chain}>
              {getNameByChainId(chain)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Who will receive the NFT?
        </label>
        <input
          required
          pattern="^0x[a-fA-F0-9]{40}$"
          name="address"
          placeholder="0x00000000000000000000"
          value={destAddress}
          onChange={(e) => updateDestAddress(e.target.value)}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
      </div>
      {chain?.id !== chainId ? (
        <SwitchWalletButton chainId={chainId} />
      ) : (
        <SubmitButton tx={tx} />
      )}
    </form>
  );
}
