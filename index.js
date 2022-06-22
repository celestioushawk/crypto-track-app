import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', async (req, res) => {
    const coins = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=20&page=1&sparkline=false');
    const coinsData = await coins.json();
    console.log(coinsData[0].market_cap);
    res.render('index', {
        coins: coinsData
    });
});

app.get('/coins/:id', async (req, res) => {
    const coinId = req.params.id;
    const coins = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const coinsData = await coins.json();
    res.render('coinPage', {
        coinData: coinsData,
        coinName: coinsData.name,
        coinId: coinsData.id
    });

});

app.use((req, res) => {
    res.send("Page Not Found 404");
});





app.listen(3000, () => console.log('server running on port 3000'));