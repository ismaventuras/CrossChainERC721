import {ethers} from "ethers";
import { MOONBEAM_CHAINID } from "@/helpers/chains";
import { CrossChainERC721ContractInfo } from "@/helpers/crossChainHelper";
import { useEffect, useState } from "react";
import { useContract, useProvider } from "wagmi";

export const useEstimateMintNFTGas = (chain:number) => {
    const [gas,setGas] = useState<number>()
    const [ether,setEther] = useState<string>("")
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const provider = useProvider()
    const sc = useContract({
        address: CrossChainERC721ContractInfo.address,
        abi: CrossChainERC721ContractInfo.abi,
    });

    useEffect(()=>{
        (async () => {            
            try {
                setIsLoading(true)
                const gasPrice =  await (await provider.getFeeData()).maxFeePerGas                
                
                const functionGas =  chain === MOONBEAM_CHAINID ? 
                await sc?.connect(provider).estimateGas.mintNFT("0x1983B640B9ab84708d745AaAC6d6340D791Dc5e9","ipfs://bafyreidapq7wjcucxxo2oikreyjegzkmnzidbaenc6q36pn5hqdiudsqci/metadata.json") 
                : 
                await sc?.connect(provider).estimateGas.mintRemote("avalanche","0x1983B640B9ab84708d745AaAC6d6340D791Dc5e9","ipfs://bafyreidapq7wjcucxxo2oikreyjegzkmnzidbaenc6q36pn5hqdiudsqci/metadata.json")
                if(functionGas && gasPrice){
                    const gas = gasPrice.mul(functionGas)
                    setGas(gas.toNumber())
                    setEther(ethers.utils.formatEther(gas))
                }                            
            } catch (error) {
            } finally{
                setIsLoading(false)
            }
        })()
    },[provider,sc])

    
    return {gas, ether, isLoading}

}