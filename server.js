const express = require('express');
const app = express();
const ApiController = require('./controllers/apiController');
const N26ApiController = require('./controllers/n26ApiController');
const StatisticsController = require('./controllers/statisticsController');
const config = require('./config/config');

app.use(express.json());

//app.get('/login', ApiController.redirectToAuth);
//app.get('/callback', ApiController.handleCallback);
app.get('/login', N26ApiController.redirectToAuth);
app.get('/callback', N26ApiController.handleCallback);
app.get('/generate-statistics', StatisticsController.generateStatistics);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Redirect user to the bank's authorization URL
app.get('/login', (req, res) => {
    const authUrl = `${config.raiffeisen.authUrl}?response_type=code&client_id=${config.raiffeisen.clientId}&redirect_uri=${config.raiffeisen.redirectUri}`;
    res.redirect(authUrl);
});

// Handle the callback from the bank's OAuth server
app.get('/callback', ApiController.handleCallback);

