import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["**/node_modules/**", "**/dist/**", "**/tests/**"],
    },
  },
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@tests": path.resolve(__dirname, "./src/tests"),
    },
  },
});
