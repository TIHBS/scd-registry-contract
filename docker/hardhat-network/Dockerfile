FROM node:16

WORKDIR /usr/src/hardhat-network
COPY package*.json ./
RUN npm install
COPY hardhat.config.ts tsconfig.json ./
COPY test/TestWallets.ts ./test/
ENTRYPOINT npx hardhat node
