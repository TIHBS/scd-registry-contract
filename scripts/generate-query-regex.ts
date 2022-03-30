import { generateSolidityRegex } from "../src/util/generate-solidity-regex";

async function main() {
  const name = "QueryRegex";

  const supportedKeys = [
    "Name",
    "Author",
    "InternalAddress",
    "Url",
    "Signature",
    "Version",
    "Function",
    "Event",
    "BlockchainType",
  ].join("|");

  const regex = `(${supportedKeys})=('.*?')`;

  await generateSolidityRegex(name, regex);
}

main()
  .then(() => console.log("Finished!"))
  .catch(err => console.log(err));
