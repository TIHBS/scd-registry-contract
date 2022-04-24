FROM node:16

WORKDIR /home/node
COPY . .
RUN chown -R node /home/node
USER node
RUN npm i 

CMD npx hardhat deploy --network ${NETWORK}
