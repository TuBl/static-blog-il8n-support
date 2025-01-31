import path from "path";
import fs from "fs";

import { MDX } from "@/src/components/Mdx";
export default async function MarkDownPage() {
  const cwd = path.resolve(process.cwd(), "src/content/markdown");
  const fileContent = fs.readFileSync(`${cwd}/sample-markdown.mdx`, "utf-8");
  const lang = "en";
  return (
    <main>
      <MDX content={fileContent} lang={lang} />
    </main>
  );
}
