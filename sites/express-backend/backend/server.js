const express = require('express')
const app = express()
const port = 8001
const {google} = require('googleapis');
const googleKey = require("./google_key.json");

const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

function obtainAccessToken() {

    const jwtClient = new google.auth.JWT(
        googleKey.client_email,
        null,
        googleKey.private_key,
        SCOPE
    );

    return jwtClient.authorize(); 
}

app.get('/obtain-access-token', (req, res) => {
    obtainAccessToken().then(function(tok) {
        res.json(tok);
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
