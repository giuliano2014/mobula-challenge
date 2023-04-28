import dotenv from "dotenv";
dotenv.config();

type GraphQLQuery = string;
type Variables = { [key: string]: any };

const endpoint = process.env.ENDPOINT ?? "";
const tokenID = process.argv[2] ?? process.env.DEFAULT_TOKEN_ID;

const query = `
    query SurgeSwapV2TokenDayDatas($id: ID!) {
        token(id: $id) {
            tokenDayData(where: {_change_block: {number_gte: 0}}) {
                date
                dailyVolumeUSD
                priceUSD
                totalLiquidityUSD
            }
        }
    }
`;

const fetchData = async (query: GraphQLQuery, variables: Variables) => {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_ACCESS_TOKEN", // If the API requires an access token, add it here.
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
    }

    return await response.json();
};

const main = async () => {
    try {
        const result = await fetchData(query, { id: tokenID });
        console.log("Get data", result.data.token.tokenDayData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

main();
