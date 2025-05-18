import fs from "fs";
import path from "path";
import { glob } from "glob";

const outFile = "./extracted-classnames.txt";
const allMatches = new Set();

const files = await glob("src/**/*.{ts,tsx,js,jsx}", { absolute: true });

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const regex = /className\s*=\s*["']([^"']+)["']/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const raw = match[1].trim();
    if (raw.length > 0) {
      allMatches.add(raw);
    }
  }
}

fs.writeFileSync(outFile, Array.from(allMatches).join("\n"), "utf8");

console.log(`[✓] 총 ${allMatches.size}개의 className 문자열을 추출했습니다.`);
console.log(`[→] 저장 위치: ${outFile}`);
