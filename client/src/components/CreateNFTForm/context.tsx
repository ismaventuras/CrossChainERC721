import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import type { Address, NFTFormContextState } from "@/types";
import { MOONBEAM_CHAINID } from "@/helpers/chains";

type updateTextValueType = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type NftFormContextType = NFTFormContextState & {
  //ipfs: string;
  isOpenModal: boolean
  formData: FormData | null
  //updateIpfs: (ipfs: string) => void;
  updateTextValue: (e: updateTextValueType) => void;
  //updateFile: (file: File | null) => void;
  updateChain: (chain_: number) => void;
  toogleModal: ()=>void;
  updateFormData: (form:FormData)=> void;
};

const NftFormContext = createContext<NftFormContextType | null>(null);

export const NftFormContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const updateFormData = (form:FormData) => setFormData(form)
  const [state, setState] = useState<NFTFormContextState>({            
    address: "",
    chain: MOONBEAM_CHAINID,
  });
  //const [ipfs, setIPFS] = useState("");
  
  const toogleModal = () => setIsOpenModal(!isOpenModal)
  const updateTextValue = (e: updateTextValueType) => setState({ ...state, [e.target.name]: e.target.value });
  //const updateFile = (file: File | null) => setState({ ...state, file: file });
  //const updateIpfs = (ipfs_: string) => setIPFS(ipfs_);
  const updateChain = (chain_: number) => setState({ ...state, chain: chain_ });

  const value = {
    ...state,
//    ipfs,
    isOpenModal,
    formData,
    toogleModal,
  //  updateIpfs,
    updateTextValue,
    //updateFile,
    updateChain,
    updateFormData,
    
  };

  return (
    <NftFormContext.Provider value={value}>{children}</NftFormContext.Provider>
  );
};

export const useNftFormContext = () => {
  const context = useContext(NftFormContext);
  if (!context) {
    throw new Error("context has to be used within <NftFormContext.Provider>");
  }
  return context;
};
