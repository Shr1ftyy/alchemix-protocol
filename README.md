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

Deploy locally with truffle:

  `npx truffle migrate --network development`

A Documentation w/ changes made vs. Alchemix main fork can be seen inside DOCUMENTATION.md
