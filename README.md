# Registry Contract

This repository contains the Registry Contract.
It's build for the EVM.

## Requirements

- npm
- node

## Compile

To compile the contract run:

```bash
npm i
npm run compile
```

This also generates the contracts typescript bindings.

## Deploy

To deploy the contract to local ganache instance run:

```bash
npm run deploy:container
```

To deploy to some other network, configure it in the `hardhat.config.ts` and run:

```bash
npx hardhat deploy --network <network-name>
```

## Test

It is important to generate the contracts typescript bindings by first compiling the contract.
To test the project run:

```bash
npm test
```
