import { readdirSync, copyFileSync, rmSync, existsSync } from "fs";
import { resolve, join } from "path";

const distPath = resolve(process.cwd(), "dist");
const uiPath = resolve(distPath, "ui");
const codePath = resolve(distPath, "code");

try {
  // dist/ui의 모든 파일을 dist로 복사
  if (existsSync(uiPath)) {
    const uiFiles = readdirSync(uiPath, { withFileTypes: true });
    for (const file of uiFiles) {
      const src = join(uiPath, file.name);
      const dest = join(distPath, file.name);
      copyFileSync(src, dest);
    }
    console.log("✅ UI 파일들을 dist로 복사했습니다.");
  }

  // dist/code의 모든 파일을 dist로 복사
  if (existsSync(codePath)) {
    const codeFiles = readdirSync(codePath, { withFileTypes: true });
    for (const file of codeFiles) {
      const src = join(codePath, file.name);
      const dest = join(distPath, file.name);
      copyFileSync(src, dest);
    }
    console.log("✅ Code 파일들을 dist로 복사했습니다.");
  }

  // dist/ui와 dist/code 디렉토리 삭제
  if (existsSync(uiPath)) {
    rmSync(uiPath, { recursive: true, force: true });
    console.log("✅ dist/ui 디렉토리를 삭제했습니다.");
  }

  if (existsSync(codePath)) {
    rmSync(codePath, { recursive: true, force: true });
    console.log("✅ dist/code 디렉토리를 삭제했습니다.");
  }

  console.log("✅ dist 병합이 완료되었습니다.");
} catch (error) {
  console.error("❌ dist 병합 실패:", error.message);
  process.exit(1);
}

