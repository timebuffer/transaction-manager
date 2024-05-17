const express = require('express');
const app = express();
const ApiController = require('./controllers/apiController');
const StatisticsController = require('./controllers/statisticsController');

app.use(express.json());

// Redirect user to the bank's authorization URL
app.get('/login', (req, res) => {
    const authUrl = `${config.raiffeisen.authUrl}?response_type=code&client_id=${config.raiffeisen.clientId}&redirect_uri=${config.raiffeisen.redirectUri}`;
    res.redirect(authUrl);
});

// Handle the callback from the bank's OAuth server
app.get('/callback', ApiController.fetchAndSaveTransactions);

// Route to generate statistics
app.get('/generate-statistics', StatisticsController.generateStatistics);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
