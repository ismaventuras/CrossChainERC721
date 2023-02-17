import { Chain } from "@rainbow-me/rainbowkit"

export const moonbaseAlpha: Chain = {
    id:1287,
    name: 'Moonbase Alpha',
    network: 'MOON',
    iconUrl: '/icons/moonbaseAlpha.png',
    iconBackground: '#fff',    
    nativeCurrency:{
        decimals:18,
        name:'DEV',
        symbol:'DEV'
    },
    rpcUrls:{
        default: {
            http: ['https://rpc.api.moonbase.moonbeam.network'],
            webSocket: ['wss://wss.api.moonbase.moonbeam.network']
        },
        public: {
            http: ['https://rpc.api.moonbase.moonbeam.network'],
            webSocket: ['wss://wss.api.moonbase.moonbeam.network']
        },
        
    },
    blockExplorers:{
        default:{name:'Moonscan', url:'https://moonbase.moonscan.io/'},
        etherscan:{name:'Moonscan', url:'https://moonbase.moonscan.io/'}        
    },
    contracts:{
        multicall3:{
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 1850686 
        },        
    },
    testnet: true,    

}

export const moonriver = {
    id:1285,
    name: 'Moonriver',
    network: 'MOON',
    iconUrl: '/icons/moonriver.png',
    iconBackground: '#fff',    
    nativeCurrency:{
        decimals:18,
        name:'MOVR',
        symbol:'MOVR'
    },
    rpcUrls:{
        public: {http: ['https://moonriver.public.blastapi.io'], webSocket:['wss://moonriver.public.blastapi.io']},
        default: {http: ['https://moonriver.public.blastapi.io'], webSocket: ['wss://moonriver.public.blastapi.io']}
    },
    blockExplorers:{
        default:{name:'Moonscan', url:'https://moonriver.moonscan.io/'},
        etherscan:{name:'Moonscan', url:'https://moonriver.moonscan.io/'}        
    },
    contracts:{
        multicall3:{
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 1597904 
        },        
    },
    testnet: false,    

}

export const moonbeam:Chain = {
    id:1284,
    name: 'Moonbeam',
    network: 'MOON',
    iconUrl: '/icons/moonbeam.png',
    iconBackground: '#fff',    
    nativeCurrency:{
        decimals:18,
        name:'GLMR',
        symbol:'GLMR'
    },
    rpcUrls:{
        public: {http: ['https://moonbeam.public.blastapi.io'], webSocket:['wss://moonbeam.public.blastapi.io']},
        default: {http: ['https://moonbeam.public.blastapi.io'], webSocket: ['wss://moonbeam.public.blastapi.io']}
    },
    blockExplorers:{
        default:{name:'Moonscan', url:'https://moonscan.io/'},
        etherscan:{name:'Moonscan', url:'https://moonscan.io/'}        
    },
    contracts:{
        multicall3:{
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 609002 
        },        
    },
    testnet: false,    

}