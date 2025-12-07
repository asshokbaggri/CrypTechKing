import axios from "axios";

export default async function price(symbol, amount) {
    try {
        if (!symbol || !amount) return 0;

        const url = `https://api.dexscreener.com/latest/dex/tokens/${symbol}`;
        const res = await axios.get(url);

        const p = res?.data?.pairs?.[0]?.priceUsd || 0;
        return Number(p) * amount;

    } catch {
        return 0;
    }
}
