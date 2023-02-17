type Chain = {
    [key:string]: number
}

export const MOONBEAM_CHAINID = 1284
export const POLYGON_CHAINID = 137
//export const AVALANCHE_CHAINID = 43113
export const ARBITRUM_CHAINID = 421611
export const VALID_CHAINS:number[] = [MOONBEAM_CHAINID,POLYGON_CHAINID,ARBITRUM_CHAINID]


export const CHAINS_BY_ID: {[key:number|string]:string} = {
    1:'ethereum',
    10:'optimism',
    56:'binance',
    137:'polygon',
    250:'fantom',
    1284:'moonbeam',
    1285:'moonriver',
    1287:'moonbeam',
    421611:'arbitrum',
    421613:'arbitrum',
    43113:'avalanche',
    43114:'avalanche',
    80001:'polygon'
}

export const BLOCKEXPLORER_BY_CHAINID: {[key:number|string]:string} = {
    1284: 'https://moonscan.io/',
    1287: 'https://moonbase.moonscan.io/',
    137: 'https://polygonscan.com/',
    43113:'https://testnet.snowtrace.io/',
    43114:'https://snowtrace.io/',
    80001:'https://mumbai.polygonscan.com/',
}



export const getExplorerByChainId = (chainId:number | string) => {
    return BLOCKEXPLORER_BY_CHAINID[chainId]
}
export const getNameByChainId = (chainId:number | string) => {
    return CHAINS_BY_ID[chainId]
}