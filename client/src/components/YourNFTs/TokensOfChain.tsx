import { CrossChainERC721ContractInfo } from "@/helpers/crossChainHelper";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import type { BigNumber } from "ethers";
import { getNameByChainId } from "@/helpers/chains";
import TransferTokenModal from "./TransferTokenModal";

function TokenListItem({ item,chainId }: {item:any,chainId:number}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div key={item} className="px-4 py-3 bg-white rounded-md shadow-md">
      <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
        #{item && item.toNumber()}
      </span>
      <div className="mt-2">
        <button className="text-sm uppercase border-2 border-blue-200 px-4 py-2" onClick={handleClose}>
          Transfer
        </button>
      </div>
      {isOpen &&  <TransferTokenModal chainId={chainId} tokenId={item} isOpen={isOpen} handleClose={handleClose}/>}
      
    </div>
  );
}

export default function TokensOfChain({ chainId }: { chainId: number }) {
  const { address, isConnected } = useAccount();
  const [contracts, setContracts] = useState<any[]>();

  const balanceOf = useContractRead({
    address: CrossChainERC721ContractInfo.address as `0x${string}`,
    abi: CrossChainERC721ContractInfo.abi,
    functionName: "balanceOf",
    args: [address],
    chainId: chainId,
  });
  

  useEffect(() => {
    if (balanceOf.data) {
      const number = (balanceOf.data as BigNumber).toNumber();
      let c = [];
      for (let index = 0; index < number; index++) {
        let obj = {
          address: CrossChainERC721ContractInfo.address as `0x${string}`,
          abi: CrossChainERC721ContractInfo.abi,
          functionName: "tokenOfOwnerByIndex",
          args: [address, index],
          chainId: chainId,
        };
        c.push(obj);
      }
      setContracts(c);
    }
  }, [balanceOf.data]);

  const { data, isSuccess } = useContractReads({
    contracts: contracts,
  });

  const chainName = getNameByChainId(chainId);

  return (
    <div className="flex flex-col gap-2 my-4">
      <p className="text-center text-2xl capitalize">{chainName}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {isConnected
          ? data?.map((item: any) => {
              return <TokenListItem item={item} key={item} chainId={chainId} />;
            })
          : `Loading ${chainName}`}
      </div>
    </div>
  );
}
