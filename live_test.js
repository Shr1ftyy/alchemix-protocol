const alUSD = artifacts.require("AlToken.sol");
const alFTM = artifacts.require("AlEth.sol");
const AlchemistFTM = artifacts.require("AlchemistETH.sol");
const TransmuterFTM = artifacts.require("TransmuterETH.sol");
require('dotenv').config();

module.exports = async function (deployer) {
  AlcFTM = await AlchemistFTM.at(process.env.ALCHEMIST_FTM);
  tranFTM = await TransmuterFTM.at(process.env.TRANSMUTER_FTM);
  console.log('deposit');
  await AlcFTM.deposit.sendTransaction(web3.utils.toWei('3'), true, {value: web3.utils.toWei('3')});
  console.log('withdraw');
  await AlcFTM.withdraw.sendTransaction(web3.utils.toWei('1'), true);
  console.log('mint alFTM');
  await AlcFTM.mint(web3.utils.toWei('0.069'));
  // await AlcFTM.repay(web3.utils.toWei('0'), web3.utils.toWei('0.5'), false);
  
}
