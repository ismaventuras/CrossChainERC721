import { useNftFormContext } from "../context";

export function NameInput() {
    //const {name,updateTextValue} = useNftFormContext()

    return (
      <div className="">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your NFT Name
        </label>
        <input
          required
          //value={name}
          //onChange={updateTextValue}
          autoComplete="off"
          placeholder="NFT Name"
          type="text"
          id="default-input"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
      </div>
    );
  }