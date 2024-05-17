const fs = require('fs');
const csv = require('csv-parser');
const StatisticsService = require('../services/statisticsService');

class StatisticsController {
    static async generateStatistics(req, res) {
        const { bank } = req.params;
        const transactions = [];
        fs.createReadStream(`${bank}_transactions.csv`)
            .pipe(csv())
            .on('data', (row) => {
                transactions.push(row);
            })
            .on('end', () => {
                const stats = StatisticsService.generateStatistics(transactions);
                res.status(200).json(stats);
            });
    }
}

module.exports = StatisticsController;
