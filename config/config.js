module.exports = {
    raiffeisen: {
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        redirectUri: 'http://localhost:3000/callback',
        authUrl: 'https://auth.raiffeisen.com/oauth/authorize',
        tokenUrl: 'https://auth.raiffeisen.com/oauth/token',
        apiUrl: 'https://api.raiffeisen.com/transactions'
    }
};
