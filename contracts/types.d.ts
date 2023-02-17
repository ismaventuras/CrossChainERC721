export type Chain = {
    name:string
    axelarName:string
    gateway: string
    gasService: string
    RPC?: string
    etherscan?: string
}

export type Chains = {    
    polygon:Chain,
    moonbeam:Chain,
    avalanche:Chain,
    arbitrum:Chain
    hardhat:Chain
}