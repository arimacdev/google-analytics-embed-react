import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __GAPI_CLIENT_ID__:
      '"' +
      JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "..", "..", "oauth_key.json"))
      ).web.client_id +
      '"',
  },
  server: {
    port: 3000,
  },
});
