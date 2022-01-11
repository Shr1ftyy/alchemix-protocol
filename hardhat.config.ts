import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-typechain";
import "solidity-coverage";

require('dotenv').config()

export default {
  namedAccounts: {
    deployer: 0,
    governance: 0,
    rewards: 0,
    sentinel: 1,
    newGovernance: 0,
    user: 0,
    dai: {
      1: '0x6B175474E89094C44Da98b954EedeAC495271d0F', //mainnet dai address
      1337: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e', //fantom dai address
      250: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e', //fantom dai address
      3: '0xad6d458402f60fd3bd25163575031acdce07538d'
    },
    yearnVault: {
      1: '0x19D3364A399d251E894aC732651be8B0E4e85001', // mainnet yearn daivault address
      1337: '0x637eC617c86D24E421328e6CAEa1d92114892439', // fantom yearn daivault address
      250: '0x637eC617c86D24E421328e6CAEa1d92114892439', //fantom dai address
      3: '0xdbfb15bc9beaaacda989ce3a6864af262166ac06'
    },
    linkOracleAddress: {
      1: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
      1337: '0x91d5DEFAFfE2854C7D02F50c80FA1fdc8A721e52',
      250: '0x91d5DEFAFfE2854C7D02F50c80FA1fdc8A721e52',
    }
  },
  networks: {
    coverage: {
      url: "http://localhost:8545",
      gas: 20000000,
    },
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: false,
      gasLimit: 6721975,
      // gas: 20000000, 
      gasPrice: 20000000000,
      // baseFeePerGas: 21,
      // forking:{
      //   url: "https://rpc.ftm.tools/"
      // }
    }
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5"
  },
};