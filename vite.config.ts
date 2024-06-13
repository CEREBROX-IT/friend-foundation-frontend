import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file
dotenvConfig({ path: resolve(__dirname, ".env") });

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3500, 
  },
});
