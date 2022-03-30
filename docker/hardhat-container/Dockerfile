FROM node:16

WORKDIR /usr/src/hardhat-container
COPY package*.json ./
COPY hardhat.config.ts tsconfig.json ./
COPY src/util/ ./src/util/
COPY contracts contracts
COPY scripts scripts
COPY tasks tasks
RUN npm install
RUN npm run compile
EXPOSE 8545
ENTRYPOINT npx hardhat node
