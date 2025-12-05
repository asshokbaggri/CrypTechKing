// frontend/src/pages/coin.jsx

import { useEffect, useState } from "react";
import { api } from "../utils/api";
import TokenStats from "../components/TokenStats";

export default function CoinPage() {
    const address = new URLSearchParams(window.location.search).get("address");
    const [data, setData] = useState(null);

    useEffect(() => {
        api.getCoin(address).then(res => setData(res));
    }, [address]);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="page">
            <h1>Token: {data.address}</h1>
            <TokenStats data={data} />
        </div>
    );
}
