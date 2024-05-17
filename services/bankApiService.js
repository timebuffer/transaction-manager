const axios = require('axios');
const https = require('https');
const config = require('../config/config');

const httpsAgent = new https.Agent({
    cert: config.raiffeisen.cert,
    key: config.raiffeisen.key
});

class BankApiService {
    static getAuthorizationUrl() {
        const { clientId, redirectUri, authUrl } = config.raiffeisen;
        const scope = 'YOUR_SCOPES'; // Define the required scopes
        return `${authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    }

    static async getAccessToken(code) {
        const { clientId, clientSecret, redirectUri, tokenUrl } = config.raiffeisen;
        const params = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret
        };

        try {
            const response = await axios.post(tokenUrl, new URLSearchParams(params), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                //httpsAgent
            });
            return response.data;
        } catch (error) {
            console.error('Error obtaining access token:', error);
            throw error;
        }
    }

    static async fetchTransactions(accessToken) {
        try {
            const response = await axios.get(config.raiffeisen.apiUrl, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                //httpsAgent
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }
}

module.exports = BankApiService;
