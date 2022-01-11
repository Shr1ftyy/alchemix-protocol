const alUSD = artifacts.require("AlToken.sol");
const alFTM = artifacts.require("AlEth.sol");
const Alchemist = artifacts.require("Alchemist.sol");
const AlchemistFTM = artifacts.require("AlchemistETH.sol");
const Transmuter = artifacts.require("Transmuter.sol");
const TransmuterB = artifacts.require("TransmuterB.sol");
const TransmuterFTM = artifacts.require("TransmuterETH.sol");
const YearnVaultAdapter = artifacts.require("adapters/YearnVaultAdapter.sol");
const YearnVaultAdapterFTM = artifacts.require("adapters/YearnVaultAdapterETH.sol");
const YearnVaultAdapterWithIndirection = artifacts.require("adapters/YearnVaultAdapterWithIndirection.sol");
const YearnVaultAdapterWithIndirectionFTM = artifacts.require("adapters/YearnVaultAdapterWithIndirectionETH.sol");

module.exports = async function (deployer) {
  // CONSTANTS FOR DEPLOYMENT
  let addr;
  await web3.eth.personal.getAccounts().then(acct => addr = acct[0]);
  const yDAIVault = '0x637eC617c86D24E421328e6CAEa1d92114892439';
  const yFTMVault = '0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0';
  const linkOracle = '0x91d5DEFAFfE2854C7D02F50c80FA1fdc8A721e52';

  console.log('deploying alTokens')
  await deployer.deploy(alUSD);
  AL_USD = await alUSD.deployed();
  await deployer.deploy(alFTM);
  AL_FTM = await alFTM.deployed();
  console.log('DEPLOYED')

  // alUSD vault and transmuter initialization
  console.log('deploying alUSD Alchemist')
  await deployer.deploy(Alchemist, "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", // fantom dai address,
                  AL_USD.address,
                  addr,
                  addr);
  AlUSD = await Alchemist.deployed();
  console.log('disable emergency exit')
  AlUSD.setEmergencyExit(false);
  console.log('DEPLOYED')
  console.log('deploying Transmuter')
  await deployer.deploy(Transmuter, 
                    AL_USD.address, 
                    "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", 
                    addr);
  trans = await Transmuter.deployed()
  console.log('DEPLOYED')
  console.log('deploying alUSD Transmuter')
  await deployer.deploy(TransmuterB, 
                    AL_USD.address, 
                    "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", 
                    addr);
  transB = await TransmuterB.deployed()
  console.log('DEPLOYED')

  console.log('deploying yDaiVault Adapter')
  await deployer.deploy(YearnVaultAdapter, yDAIVault, AlUSD.address)
  yVaultAdapter = await YearnVaultAdapter.deployed();
  console.log('DEPLOYED')
  console.log('deploying yDaiVault Adapter w/ Indirection')
  await deployer.deploy(YearnVaultAdapterWithIndirection, yDAIVault, transB.address)
  yVaultAdapterWithIndirection = await YearnVaultAdapterWithIndirection.deployed();
  console.log('DEPLOYED')

  console.log('setting transmuter in alUSD')
  await AlUSD.setTransmuter(trans.address);
  console.log('setting rewards in alUSD')
  await AlUSD.setRewards(addr);
  console.log('setting harvest fee in alUSD')
  await AlUSD.setHarvestFee(1000);
  console.log('initializing yDaiVault Adapter in alUSD')
  await AlUSD.initialize(yVaultAdapter.address);
  console.log('setting oracle address in alUSD')
  await AlUSD.setOracleAddress(linkOracle, 98000000);
  console.log('setting rewards in alUSD transmuter')
  await transB.setRewards(addr);
  // console.log('setting active vault in alUSD transmuter')
  // await transB._updateActiveVault(yVaultAdapterWithIndirection.address);
  console.log('initializing vault in alUSD transmuter')
  await transB.initialize(yVaultAdapterWithIndirection.address);
  console.log('setting sentinel in alUSD transmuter')
  await transB.setSentinel(addr);
  console.log('setting pause to false in alUSD transmuter')
  await transB.setPause(false);


  // alFTM vault and transmuter initialization
  await deployer.deploy(AlchemistFTM, "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83", // fantom wftm address,
                  AL_FTM.address,
                  addr,
                  addr);
  AlFTM = await AlchemistFTM.deployed();
  await deployer.deploy(TransmuterFTM, 
                  AL_FTM.address, 
                  "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83", 
                  addr);

  console.log('disable emergency exit')
  AlFTM.setEmergencyExit(false);
  transFTM = await TransmuterFTM.deployed()
  await deployer.deploy(YearnVaultAdapterFTM, yFTMVault, AlFTM.address)
  yVaultAdapterFTM = await YearnVaultAdapterFTM.deployed();
  await deployer.deploy(YearnVaultAdapterWithIndirectionFTM, yFTMVault, transFTM.address)
  yVaultAdapterWithIndirectionFTM = await YearnVaultAdapterWithIndirectionFTM.deployed();

  console.log('setting reward for alFTM')
  await AlFTM.setRewards(addr);
  console.log('setting harvest fee for alFTM')
  await AlFTM.setHarvestFee(1000);
  console.log('setting keepers for alFTM')
  await AlFTM.setKeepers([addr], [true]);
  console.log('setting transmuter for alFTM')
  await AlFTM.setTransmuter(transFTM.address);
  console.log('initializing wFTM vault for alFTM')
  await AlFTM.initialize(yVaultAdapterFTM.address);
  console.log('setting rewards for alFTM transmuter')
  await transFTM.setRewards(addr);
  console.log('initializing wFTM vault w/ indirection for alFTM transmuter')
  await transFTM.initialize(yVaultAdapterWithIndirectionFTM.address);
  console.log('setting pause to false for alFTM transmuter')
  await transFTM.setPause(false);

  console.log('whitelist Alchemists in alToken contracts')
  await AL_USD.setWhitelist(alUSD.address, true)
  await AL_FTM.setWhitelist(alFTM.address, true)
  console.log('set ceilings for minting')
  await AL_USD.setCeiling(alUSD.address, web3.utils.toWei('100'))
  await AL_FTM.setCeiling(alFTM.address, web3.utils.toWei('100'))

};
