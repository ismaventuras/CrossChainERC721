import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "./tasks"

const {PRIVATE_KEY,RPC_URLS,ETHERSCAN_API_KEYS} = require('./.env.json')


const config: HardhatUserConfig = {
  networks: {
    polygon: {
      url: RPC_URLS.polygon,
      accounts: [PRIVATE_KEY],
    },
    moonbeam: {
      url: RPC_URLS.moonbeam,
      accounts: [PRIVATE_KEY]
    },
    avalanche:{
      url: RPC_URLS.avalanche,
      accounts: [PRIVATE_KEY]
    },
    arbitrum:{
      url:RPC_URLS.arbitrum,
      accounts: [PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: {
      moonbeam: ETHERSCAN_API_KEYS.moonbeam,
      moonbaseAlpha: ETHERSCAN_API_KEYS.moonbeam,
      polygon: ETHERSCAN_API_KEYS.polygon,
      polygonMumbai: ETHERSCAN_API_KEYS.polygon,
      avalanche: ETHERSCAN_API_KEYS.avalanche,
      avalancheFujiTestnet: ETHERSCAN_API_KEYS.avalanche,
      arbitrumOne: ETHERSCAN_API_KEYS.arbitrum,
      arbitrumGoerli: ETHERSCAN_API_KEYS.arbitrum
    }
  },
  solidity: {
    compilers:[
      {
        version: '0.8.0',
      },
      {
        version: '0.8.16',
      },
    ],
    settings: {
      evmVersion: process.env.EVM_VERSION || 'london',
      optimizer: {
        enabled: true,
        runs: 1000,
        details: {
          peephole: true,
          inliner: true,
          jumpdestRemover: true,
          orderLiterals: true,
          deduplicate: true,
          cse: true,
          constantOptimizer: true,
          yul: true,
          yulDetails: {
            stackAllocation: true,
          },
        },
      },
    },
  },
};

export default config;
