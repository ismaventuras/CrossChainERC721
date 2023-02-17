import { useNftFormContext } from "../context";

export function AddressInput() {
  const {updateTextValue,address} = useNftFormContext()
    return (
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
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "          
          onChange={updateTextValue}
          value={address}
        />
      </div>
    );
  }