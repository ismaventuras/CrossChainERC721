import { Chains } from "./types";

export const { ETHERSCAN_API_KEYS, axelarGateway, axelarGasService} = require('./.env.json')

export const chains:Chains = {
        "moonbeam":{
            "name":"moonbeam",
            "axelarName":"moonbeam",
            "gateway": axelarGateway.moonbeam,
            "gasService": axelarGasService.moonbeam,
        },
        "polygon":{
            "name":"polygon",
            "axelarName":"polygon",
            "gateway": axelarGateway.polygon,
            "gasService": axelarGasService.polygon,
        },
        "avalanche":{
            "name":"avalanche",
            "axelarName":"avalanche",
            "gateway": axelarGateway.avalanche,
            "gasService": axelarGasService.avalanche,
        },
        "arbitrum":{
            "name":"arbitrum",
            "axelarName":"arbitrum",
            "gateway": axelarGateway.arbitrum,
            "gasService": axelarGasService.arbitrum,
        },
        "hardhat":{
            "name":"hardhat",
            "axelarName":"hardhat",
            "gateway": "0x4D147dCb984e6affEEC47e44293DA442580A3Ec0",
            "gasService": "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6",
            "etherscan":""
        }    
}

