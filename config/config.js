const fs = require('fs');
const path = require('path');

module.exports = {
    raiffeisen: {
        clientId: 'Wjokf6dCN7C2i5CUpX73CffpNzpgCofM',
        clientSecret: 'YOUR_CLIENT_SECRET', // Replace with your client secret
        redirectUri: 'http://localhost:3000/callback',
        authUrl: 'https://sandbox.raiffeisen.com/oauth/authorize', // Example URL, use the correct one
        tokenUrl: 'https://sandbox.raiffeisen.com/oauth/token',    // Example URL, use the correct one
        apiUrl: 'https://sandbox.raiffeisen.com/transactions',     // Example URL, use the correct one
        //cert: fs.readFileSync(path.join(__dirname, '../cert/eidas-cert.pem')),
        //key: fs.readFileSync(path.join(__dirname, '../cert/eidas-key.pem'))
    },
    n26: {
        clientId: 'YOUR_N26_CLIENT_ID', // Replace with your N26 client ID
        clientSecret: 'YOUR_N26_CLIENT_SECRET', // Replace with your N26 client secret
        redirectUri: 'http://localhost:3000/callback', // Replace with your redirect URI
        authUrl: 'https://api.tech26.de/oauth/authorize', // N26 OAuth authorization URL
        tokenUrl: 'https://api.tech26.de/oauth/token',    // N26 OAuth token URL
        apiUrl: 'https://api.tech26.de'                  // N26 API base URL
    }
};
