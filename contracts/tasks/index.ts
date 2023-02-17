import { task,  } from "hardhat/config";
import { chains  } from "../data";
import { Chains } from "../types";

const isValidNetwork = (value: string) => {
    if (chains.hasOwnProperty(value)) return true
    else return false
}

task("deployCrossChainERC721", "Deploys an isntance of CrossChainERC721")
    .setAction(async (taskArgs, hre) => {
        if (!isValidNetwork(hre.network.name)) {
            console.error('unsupported network', hre.network.name)
            return
        }
        const chain = chains[(hre.network.name as keyof Chains)]
        const contract = await hre.ethers.getContractFactory("CrossChainERC721");
        const name = 'CrossChainERC721'
        const symbol = 'CrossChainERC721'
        console.log("Starting deployment of CrossChainERC721 on", chain.name)    
        const instance = await contract.deploy(chain.gateway, chain.gasService, name, symbol, chain.axelarName);
        await instance.deployed()

        console.log(`deployed to ${instance.address} using gateway ${chain.gateway} and gasService ${chain.gasService}`);
        console.log(`Run the following command to verify:`)
        console.log(`npx hardhat verify --network ${hre.network.name} ${instance.address} ${chain.gateway} ${chain.gasService} ${name} ${symbol} ${chain.axelarName}`)
    })

