const N26ApiService = require('../services/n26ApiService');
const Transaction = require('../models/transactions');
const CsvUtils = require('../utils/csvUtils');

class N26ApiController {
    static redirectToAuth(req, res) {
        const authUrl = N26ApiService.getAuthorizationUrl();
        res.redirect(authUrl);
    }

    static async handleCallback(req, res) {
        const { code } = req.query;
        try {
            const tokenData = await N26ApiService.getAccessToken(code);
            const accessToken = tokenData.access_token;
            const transactionsData = await N26ApiService.fetchTransactions(accessToken);
            const transactions = transactionsData.map(t => new Transaction(t.date, t.description, t.amount, t.type));
            await CsvUtils.saveToCsv(transactions, `n26_transactions.csv`);
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).send('Error fetching and saving transactions');
        }
    }
}

module.exports = N26ApiController;
