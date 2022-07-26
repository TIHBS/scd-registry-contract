# Registry Contract

This repository contains the Registry Contract.
It's build for the EVM.
This repository contains submodules.
Thus, users should clone this repository by running:

```bash
git clone --recurse-submodules -j8 https://github.com/TIHBS/scd-registry-contract.git
```

Or after cloning, it users should run:

```bash
git submodule update --init --recursive
```

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

## CI

For the CI to work the necessary GitHub Actions secrets need to be set:

```bash
CI
    A GitHub personal access token that allows to push to other repositories

EMAIL
    Your email address to push from

NAME
    Your username to push from

COINMARKETCAP_API_KEY
    CoinMarketCap api key to fetch current currency information
```
