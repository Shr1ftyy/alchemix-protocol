# Alchemix

- /contracts : contracts for the Alchemix protocol
- /deployments : current mainnet deployments of the Alchemix protocol, including abi's and addresses
- /tests : tests for the contracts

# Local Development
The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Coverage and/or Tests

`yarn coverage`

`yarn test`

## Local Deployment

Fork FTM Mainnet via ganache-cli:

`npx ganache-cli --fork https://rpc.ftm.tools -i 1337`

Optionally, one may make the state of the chain and key generation persistant by using
the `--db` and `-d` options. (refer to Truffle's documentation or manpage for further information on this)

Deploy locally with truffle:

  `npx truffle migrate --network development`

## Local Live Testing

As a POC, `live_test.js` can be executed with Truffle to run some basic functions on local deployments.
Ensure that the `.env` has the correct contract addresses prior to running the script.

`npx truffle exec live_test.js`

A Documentation w/ changes made vs. Alchemix's main fork can be seen inside DOCUMENTATION.md
