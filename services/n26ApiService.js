const axios = require('axios');
const qs = require('querystring');
const config = require('../config/config');

class N26ApiService {
    static getAuthorizationUrl() {
        const { clientId, redirectUri, authUrl } = config.n26;
        const scope = 'YOUR_SCOPES'; // Define the required scopes
        return `${authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    }

    static async getAccessToken(code) {
        const { clientId, clientSecret, redirectUri, tokenUrl } = config.n26;
        const params = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret
        };

        try {
            const response = await axios.post(tokenUrl, qs.stringify(params), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            return response.data;
        } catch (error) {
            console.error('Error obtaining access token:', error);
            throw error;
        }
    }

    static async fetchTransactions(accessToken) {
        try {
            const response = await axios.get(`${config.n26.apiUrl}/api/v2/accounts`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }
}

module.exports = N26ApiService;
