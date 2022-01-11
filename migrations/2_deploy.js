const alUSD = artifacts.require("Altoken");
const alFTM = artifacts.require("AlEth.sol");
const Alchemist = artifacts.require("Alchemist");
const AlchemistFTM = artifacts.require("AlchemistETH");
const Transmuter = artifacts.require("Transmuter");
const TransmuterB = artifacts.require("TransmuterB");
const TransmuterFTM = artifacts.require("TransmuterETH");
const YearnVaultAdapter = artifacts.require("adapters/YearnVaultAdapter");
const YearnVaultAdapterFTM = artifacts.require("adapters/YearnVaultAdapterETH");
const YearnVaultAdapterWithIndirection = artifacts.require("adapters/YearnVaultAdapterWithIndirection");
const YearnVaultAdapterWithIndirectionFTM = artifacts.require("adapters/YearnVaultAdapterWithIndirectionETH");

module.exports = function (deployer) {
  // CONSTANTS FOR DEPLOYMENT
  const yDAIVault = '0x637eC617c86D24E421328e6CAEa1d92114892439';
  const yFTMVault = '0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0';
  const linkOracle = '0x91d5DEFAFfE2854C7D02F50c80FA1fdc8A721e52';

  deployer.deploy(alUSD);
  AL_USD = await alUSD.deployed();
  deployer.deploy(alFTM);
  AL_FTM = await alFTM.deployed();

  // alUSD vault and transmuter initialization
  deployer.deploy(Alchemist, "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", // fantom dai address,
                  AL_USD.address,
                  deployer.address,
                  deployer.address);
  AlUSD = await Alchemist.deployed();
  deployer.deploy(Transmuter, 
                    AL_USD.address, 
                    "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", 
                    deployer.address);
  trans = await Transmuter.deployed()
  deployer.deploy(TransmuterB, 
                    AL_USD.address, 
                    "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", 
                    deployer.address);
  transB = await Transmuter.deployed()

  deployer.deploy(YearnVaultAdapter, yDAIVault, AlUSD.address)
  yVaultAdapter = await YearnVaultAdapter.deployed();
  deployer.deploy(YearnVaultAdapterWithIndirection, yDAIVault, transB.address)
  yVaultAdapterWithIndirection = await YearnVaultAdapterWithIndirection.deployed();

  await AlUSD.setTransmuter(trans.address);
  await AlUSD.setRewards(deployer.address);
  await AlUSD.setHarvestFee(1000);
  await AlUSD.initialize(yVaultAdapter.address);
  await AlUSD.setOracleAddress(linkOracle, 98000000);


  // alFTM vault and transmuter initialization
  deployer.deploy(AlchemistFTM, "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83", // fantom wftm address,
                  AL_FTM.address,
                  deployer.address,
                  deployer.address);
  AlFTM = await AlchemistFTM.deployed();
  deployer.deploy(TransmuterFTM, 
                  AL_FTM.address, 
                  "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83", 
                  deployer.address);

  transFTM = await TransmuterFTM.deployed()
  deployer.deploy(YearnVaultAdapterFTM, yFTMVault, AlFTM.address)
  yVaultAdapterFTM = await YearnVaultAdapterFTM.deployed();
  deployer.deploy(YearnVaultAdapterWithIndirectionFTM, yFTMVault, transFTM.address)
  yVaultAdapterWithIndirectionFTM = await YearnVaultAdapterWithIndirectionFTM.deployed();

  await AlUSD.setRewards(deployer.address);
  await AlUSD.setHarvestFee(1000);
  await AlUSD.setKeepers([deployer.address], [true]);
  await AlUSD.setTransmuter(transFTM.address);
  await AlUSD.initialize(yVaultAdapterFTM.address);

};
