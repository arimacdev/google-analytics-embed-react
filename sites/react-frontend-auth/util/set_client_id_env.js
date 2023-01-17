const fs = require("fs");
const path = require("path");

const ENV_FILE = path.resolve(__dirname, "..", ".env");

if (fs.existsSync(ENV_FILE)) {
  fs.rmSync(ENV_FILE);
}

const CLIENT_ID = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "..", "..", "oauth_key.json"))
).web.client_id;

fs.writeFileSync(ENV_FILE, "REACT_APP_CLIENT_ID=" + CLIENT_ID);
