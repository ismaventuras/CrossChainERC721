import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

export const useEstimateGasCrossChain = (source:string, destination:string) => {
    const AXELAR_API = "https://api.gmp.axelarscan.io/"
    
    const [gas,setGas] = useState<BigNumber>()
    const [ether,setEther] = useState<string>("")
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    useEffect(()=>{
        (
            async ()=>{
                try {
                    setIsLoading(true)
                    // const uri = AXELAR_API + new URLSearchParams({
                    //     "method": "getGasPrice",
                    //     "sourceChain": source,
                    //     "destinationChain": destination,
                    //     "sourceTokenAddress": "0x0000000000000000000000000000000000000000"
                    // })
                    const gasLimit=4e5
                    const res = await (await fetch(AXELAR_API, {
                        body:JSON.stringify({
                            "method": "getGasPrice",
                            "sourceChain": source,
                            "destinationChain": destination,
                            "sourceTokenAddress": "0x0000000000000000000000000000000000000000"
                        }),
                        method:'POST'
                    })).json()
                    const s = res.result.source_token
                    const dest = res.result.destination_native_token
                    const destPrice = 1e18 * dest.gas_price * dest.token_price.usd;                    
                    const gasPrice = destPrice / s.token_price.usd;     
                    const g = BigInt(Math.floor(gasLimit * gasPrice))                    
                    const parsedEther = ethers.utils.formatEther(g)
                    setGas(ethers.utils.parseEther(parsedEther))
                    setEther(parsedEther)   
                } catch (error:Error | any) {
                } finally{
                    setIsLoading(false)
                }
            }
        )()
    },[source,destination])

    return {gas, ether, isLoading}
}
