const BankApiService = require('../services/bankApiService');
const Transaction = require('../models/transactions');
const CsvUtils = require('../utils/csvUtils');

class ApiController {
    static redirectToAuth(req, res) {
        const authUrl = BankApiService.getAuthorizationUrl();
        res.redirect(authUrl);
    }

    static async handleCallback(req, res) {
        const { code } = req.query;
        try {
            const tokenData = await BankApiService.getAccessToken(code);
            const accessToken = tokenData.access_token;
            const transactionsData = await BankApiService.fetchTransactions(accessToken);
            const transactions = transactionsData.map(t => new Transaction(t.date, t.description, t.amount, t.type));
            await CsvUtils.saveToCsv(transactions, `raiffeisen_transactions.csv`);
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).send('Error fetching and saving transactions');
        }
    }
}

module.exports = ApiController;
