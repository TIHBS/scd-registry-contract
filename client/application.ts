import truffle from "../truffle-config.js";
import Registry from "../build/contracts/Registry.json";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { AbiItem } from "web3-utils";
import Web3 from "web3";

export default class App {
  private mnemonicPhrase: string;
  private provider: HDWalletProvider;
  private web3: Web3;

  constructor() {
    this.mnemonicPhrase =
      "stamp enrich wheat deer dry eternal step derive lens forest moral any";

    const host = truffle.networks.development.host;
    const port = truffle.networks.development.port;

    this.provider = new HDWalletProvider({
      mnemonic: { phrase: this.mnemonicPhrase },
      url: host + ":" + port.toString(),
    });

    this.web3 = new Web3(this.provider);
  }

  // async send() {
  //   const web3 = new Web3();
  //   web3.setProvider(this.provider);

  //   const tx = {
  //     from: this.provider.getAddress(0),
  //     to: this.provider.getAddress(1),
  //     value: web3.utils.toWei("15", "ether"),
  //   };

  //   const price = await web3.eth.estimateGas(tx);
  //   tx.gas = price;
  //   console.log("Price %d", price);

  //   const signedTx = await web3.eth.accounts.signTransaction(
  //     tx,
  //     "063a1bf182a234cbd9a563b01fa327357f986f1f3316297a684a9914b8c566dd"
  //   );

  //   web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  // }

  async run(message: string) {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Registry.networks[networkId];

    const instance = new web3.eth.Contract(
      Registry.abi as AbiItem[],
      deployedNetwork && deployedNetwork.address
    );

    const result = await instance.methods.Get().call();

    console.log(result);
    this.provider.engine.stop();
    // HelloWorld.setProvider(this.provider);

    // const instance = await HelloWorld.deployed();

    // let result = await instance.Get();
    // console.log(result);

    // await instance.Set(message, {
    //   from: this.provider.getAddress(),
    // });

    // result = await instance.Get();
    // console.log(result);
  }
}
