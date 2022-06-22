let dob = new Date(1640617419995);
//console.log(dob.getDate());

const getData = async () => {
    const coinChart = await fetch(`https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=inr&days=365`);
    const coinData = await coinChart.json();
    console.log(coinData.prices[0][1]);
    createChart(coinData);
    

}

const createChart = (coinData) => {
    const ctx = document.getElementById('myChart').getContext('2d'); 
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(58, 123, 213, 1");
    gradient.addColorStop(1, "rgba(0, 210, 255, 0.2");
    const labels = coinData.prices.map((coin) => {
    let date = new Date(coin[0]).getDate();
    return date;
}); 
const data={labels, 
    datasets: [
        {
            data: coinData.prices.map((coin) => {
                return coin[1];
            }),
            label: "Bitcoin",
            fill: true,
            backgroundColor: gradient,
        },
    ],
}; 
const config = {
    type: 'line', 
    data:data, 
    options: { 
        responsive: true,
        elements: {
            point: {
                radius: 0
            }
        }
    },
}; 
const mychart = new Chart(ctx, config);
}

getData();