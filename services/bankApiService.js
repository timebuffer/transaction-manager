const axios = require('axios');
const qs = require('querystring');
const config = require('../config/config');

class BankApiService {
    static async getAccessToken(code) {
        const tokenUrl = config.raiffeisen.tokenUrl;
        const params = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: config.raiffeisen.redirectUri,
            client_id: config.raiffeisen.clientId,
            client_secret: config.raiffeisen.clientSecret
        };

        try {
            const response = await axios.post(tokenUrl, qs.stringify(params), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error obtaining access token:', error);
            throw error;
        }
    }

    static async fetchTransactions(accessToken) {
        try {
            const response = await axios.get(config.raiffeisen.apiUrl, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }
}

module.exports = BankApiService;
