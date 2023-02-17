import { AddressInput } from "./Inputs/AddressInput";
import BlockchainSelectInput from "./Inputs/BlockchainSelectInput";
import { DescriptionTextarea } from "./Inputs/DescriptionTextarea";
import { NameInput } from "./Inputs/NameInput";
import { FormEvent, useState } from "react";
import FileInput from "./Inputs/FileInput";
import { useNftFormContext } from "./context";
import MintNFTModal from "./MintNFTModal/MintNFTModal";
import SubmitButton from "./SubmitButton";
import { uploadToIpfs } from "@/utils/uploadToIpfs";
import ValidateButton from "./ValidateButton";
import SpinnerIcon from "../Icons/SpinnerIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import OkIcon from "../Icons/OkIcon";
import Link from "next/link";

export default function CreateNFTForm({ cssProps }: { cssProps?: string }) {
  const { isOpenModal } =
    useNftFormContext();
  const [ipfs, setIpfs] = useState("");
  const [ipfsError, setIpfsError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;    
    const formData = new FormData(form);
    try {
      setIsLoading(true);
      const res = await uploadToIpfs(formData);
      if (res.error) throw Error(res.error);
      setIpfs(res.data);
    } catch (error: any) {
      setIpfsError(error.message);
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <form
      className="flex flex-col gap-2 max-w-md md:w-full my-2"
      onSubmit={onSubmit}
      encType="multipart/form-data"
    >
      <FileInput />
      <NameInput />
      <DescriptionTextarea />
      <BlockchainSelectInput />
      <AddressInput />
      <div className="flex flex-wrap items-center gap-4">
          <ValidateButton ipfs={ipfs} isLoading={isLoading}/>
          <div className="flex">
            {
              isLoading ?
              <>
                <SpinnerIcon/>
                <p className="text-sm text-gray-500">Uploading data to ipfs</p>
              </>
              : Boolean(ipfsError) ?
              <>
                <ErrorIcon/>
                <p className="text-sm text-gray-500">{ipfsError}</p>
              </>
              : Boolean(ipfs)  ?
              <>
                <OkIcon/>
                <p className="text-sm text-gray-500 break-all">Metadata uploaded to <Link className="underline text-blue-600" href={ipfs} target={'_blank'}>ipfs</Link></p>
              </> :null
            }
          </div>
      </div>
      <SubmitButton ipfs={ipfs} />

      {isOpenModal && <MintNFTModal ipfs={ipfs} />}
    </form>
  );
}
