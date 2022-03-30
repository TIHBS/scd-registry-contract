import fetch from "node-fetch";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import * as ProjectRootDir from "app-root-dir";

const fileName = "strings.sol";
const url = `https://raw.githubusercontent.com/Arachnid/solidity-stringutils/46983c6d9462a80229cf0d5bab8ea3b3ee31066c/src/${fileName}`;

function fixShadowWarning(code: string): string {
  let i = 0;
  code = code.replace(/( len )+/g, match => (i++ < 2 ? " _len" : match));
  i = 0;
  code = code.replace(/( len\))+/g, match => (i++ < 2 ? " _len)" : match));
  i = 0;
  code = code.replace(/(\(len)+/g, match => (i++ < 1 ? " (_len" : match));

  return code;
}

function fixLicenseIdentifierWarning(code: string): string {
  const licenseIdentifier = "// SPDX-License-Identifier: Apache-2.0\n";

  return licenseIdentifier + code;
}

async function main() {
  console.log(`Downloading ${fileName} from ${url}`);
  const rootDir = ProjectRootDir.get();

  const response = await fetch(url);
  const code = fixLicenseIdentifierWarning(fixShadowWarning(await response.text()));

  const dstDir = join(rootDir, "contracts/external/");
  mkdirSync(dstDir, { recursive: true });
  const dst = join(dstDir, fileName);
  writeFileSync(dst, code);
  console.log(`Saved file to ${dst}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
