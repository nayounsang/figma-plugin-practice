import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// UI 빌드용 설정 (index.html)
export default defineConfig({
  plugins: [react(), viteSingleFile({ useRecommendedBuildConfig: false })],
  base: "./",
  build: {
    outDir: "dist/ui",
    rollupOptions: {
      input: "index.html",
    },
  },
});

