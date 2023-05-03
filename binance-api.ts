import dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.BINANCE_ENDPOINT;
const tokenSymbol = process.argv[2] ?? process.env.DEFAULT_TOKEN_SYMBOL;

const getTickerInformation = async (symbol: string) => {
    const url = `${endpoint}ticker?symbol=${symbol}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

        const data = await response.json();
        const { closeTime, lastPrice, quoteVolume, volume } = data;
        const ticker = {
            closeTime,
            lastPrice,
            quoteVolume,
            volume,
        };

        console.log(ticker);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

getTickerInformation(tokenSymbol);
