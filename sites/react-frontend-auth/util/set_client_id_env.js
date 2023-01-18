const fs = require('fs');
const path = require('path');

const ENV_FILE = path.resolve(__dirname, '..', '.env');
const KEY_FILE = path.resolve(__dirname, '..', '..', '..', 'oauth_key.json');

if (fs.existsSync(ENV_FILE)) {
  fs.rmSync(ENV_FILE);
}

let clientId = 'NOT_PROVIDED';

if (fs.existsSync(KEY_FILE)) {
  clientId = JSON.parse(fs.readFileSync(KEY_FILE)).web.client_id;
}

fs.writeFileSync(ENV_FILE, 'REACT_APP_CLIENT_ID=' + clientId);
