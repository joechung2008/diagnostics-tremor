import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    coverage: {
      exclude: ["src/**/*.d.ts", "src/components/**", "src/lib/**"],
      include: ["src/**/*.{ts,tsx}"],
      provider: "v8",
    },
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setupTests.ts"],
  },
});
