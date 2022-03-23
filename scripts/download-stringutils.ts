import fetch from "node-fetch";
import { writeFileSync } from "fs";
import { join } from "path";
import * as ProjectRootDir from "app-root-dir";

const fileName = "strings.sol";
const url = `https://raw.githubusercontent.com/Arachnid/solidity-stringutils/46983c6d9462a80229cf0d5bab8ea3b3ee31066c/src/${fileName}`;

async function main() {
  console.log(`Downloading ${fileName} from ${url}`);
  const rootDir = ProjectRootDir.get();

  const response = await fetch(url);

  const dst = join(rootDir, `contracts/${fileName}`);
  writeFileSync(dst, await response.text());
  console.log(`Saved file to ${dst}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
