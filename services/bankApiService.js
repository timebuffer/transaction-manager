const axios = require('axios');
const config = require('../config/config');

class BankApiService {
    static async fetchTransactions(bank) {
        const { apiUrl, apiKey } = config[bank];
        try {
            const response = await axios.get(apiUrl, {
                headers: { 'Authorization': `Bearer ${apiKey}` }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching transactions from ${bank}:`, error);
            throw error;
        }
    }
}

module.exports = BankApiService;
