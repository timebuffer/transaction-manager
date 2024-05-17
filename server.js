const express = require('express');
const app = express();
const ApiController = require('./controllers/apiController');
const StatisticsController = require('./controllers/statisticsController');

app.use(express.json());

app.get('/fetch-transactions/:bank', ApiController.fetchAndSaveTransactions);
app.get('/generate-statistics/:bank', StatisticsController.generateStatistics);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
