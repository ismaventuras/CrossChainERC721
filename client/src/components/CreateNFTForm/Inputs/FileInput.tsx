import React from "react";
import { useNftFormContext } from "../context";

export default function FileInput() {
  //const {file, updateFile} = useNftFormContext()
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      const isImage = e.target.files[0].type.includes("image/");
      if (isImage) {        
    //    updateFile(e.target.files[0]);
      } else {
        e.target.value = "";
      //  updateFile(null)        
      }
    }
  };

  return (
    <div className="w-full">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        className="file:cursor-pointer file:p-2.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none file:rounded file:border-none file:bg-gray-800 file:text-white"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        name="file"        
        onChange={onFileChange}            
        accept="image/*"
        required
      />
      <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
        SVG, PNG, JPG or GIF (MAX. 20MB).
      </p>      
    </div>
  );
}
