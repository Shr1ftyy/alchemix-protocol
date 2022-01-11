# Documentation - Changes made prior to Deploying to FTM

1. Hardhat Config - added FTM yDaiVault, wFTM vault and dai chainlink oracle

```
'0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e', //fantom dai 
'0x637eC617c86D24E421328e6CAEa1d92114892439', // fantom yearn daivault
'0x91d5DEFAFfE2854C7D02F50c80FA1fdc8A721e52' // fantom dai chainlink oracle
```
This repo. mainly uses hardhat for testing purposes, for deployment see below

2. Added Truffle-based deployment system
A truffle deployment system was initialized along with a deployment script at:
`migrations/2_deploy.js`
Of course, this also resulted in the addition of a `Migrations.sol` contracts in `contracts`.
Due to a lack of detailed documentation by Alchemix, the deployment process was designed through a combined process of analysing the files in `contracts` and reverse engineering the deployments made my Alchemix on the ETH Mainnet via etherscan.

3. Modified tests - non-existing functions???
For some odd reason, there were a few non-existing functions that were unused yet still imported
in some of the test specs, of which include the following:
<pre>
 - test/contracts:
 import { MAXIMUM_U256, ZERO_ADDRESS, <b>getGas</b> } from "../utils/helpers";
 import { <b>mintDaiToAddress</b> } from "../../utils/mintUtils";
</pre>
As a result, these were removed.
Furthermore, this deployment lacks the ALCX token and other auxilary contracts that are not
related to the token vaults this connects as well as the core Alchemist and Transmuter contracts.

