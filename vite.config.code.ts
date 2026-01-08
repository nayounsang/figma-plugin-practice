import { defineConfig } from "vite";

// Code 빌드용 설정 (code.ts)
export default defineConfig({
  build: {
    outDir: "dist/code",
    target: "es2017",
    rollupOptions: {
      input: "code.ts",
      output: {
        entryFileNames: "code.js",
      },
    },
  },
});

