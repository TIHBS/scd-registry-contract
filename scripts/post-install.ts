import { execSync } from "child_process";
import * as ProjectRootDir from "app-root-dir";
import { join } from "path";

async function executeScript(name: string): Promise<Buffer> {
  const path = join(ProjectRootDir.get(), `scripts`, name);
  console.log(`Executing: ${name}`);
  console.log(path);
  const result = execSync(`npx ts-node ${path}`);
  console.log(result.toString());
  return result;
}

async function main() {
  await executeScript("generate-query-regex.ts");
  await executeScript("download-stringutils.ts");
}

main()
  .then(() => console.log("Finished!"))
  .catch(err => console.log(err));
