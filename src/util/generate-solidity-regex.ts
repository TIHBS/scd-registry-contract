import { execSync } from "child_process";
import * as ProjectRootDir from "app-root-dir";
import { join } from "path";
import { mkdirSync, writeFileSync } from "fs";

export async function generateSolidityRegex(name: string, regex: string): Promise<string> {
  const fileName = `${name}.sol`;

  console.log(`Generating ${fileName} from "${regex}"`);

  const command = `npx solregex --name ${name} "${regex}" `;
  const result = "// SPDX-License-Identifier: MIT\n" + execSync(command).toString();

  const dstDir = join(ProjectRootDir.get(), "contracts/generated/");
  mkdirSync(dstDir, { recursive: true });
  const dst = join(dstDir, fileName);

  writeFileSync(dst, result);
  console.log(`Saved file to ${dst}`);
  return dst;
}
