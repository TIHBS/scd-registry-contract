FROM node:16

WORKDIR /usr/src/hardhat-container
COPY package*.json ./
RUN npm install
COPY hardhat.config.ts tsconfig.json ./
COPY test/TestWallets.ts ./test/
COPY contracts contracts
RUN npx hardhat compile
EXPOSE 8545
ENTRYPOINT npx hardhat node
