import { useNftFormContext } from "../context";

export function DescriptionTextarea() {
  //const {description,updateTextValue} = useNftFormContext()
    return (
      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Your NFT description
        </label>
        <textarea
          //value={description}
          //onChange={updateTextValue}
          required
          name="description"
          id="message"
          rows={4}
          className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add your description here"
        ></textarea>
      </div>
    );
  }