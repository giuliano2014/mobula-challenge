import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.BSCSCAN_API_KEY ?? "";
const endpoint = process.env.BSCSCAN_ENDPOINT ?? "";
const tokenAddress = process.argv[2] ?? process.env.DEFAULT_TOKEN_ADDRESS;

const getAccountBalance = async (address: string, apiKey: string): Promise<string> => {
    const params = {
        module: 'account',
        action: 'balance',
        address,
        apiKey,
    };

    try {
        const response = await axios.get(endpoint, { params });

        if (response.data.status !== '1') throw new Error(response.data.message);

        return response.data.result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching balance:', error.message);
        } else {
            console.error('Error fetching balance:', error);
        }
        throw error;
    }
};


const main = async () => {
    try {
        const balance = await getAccountBalance(tokenAddress, apiKey);
        console.log(`The balance of address ${tokenAddress} is ${balance} wei.`);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error:', error);
        }
    }
};

main();
    