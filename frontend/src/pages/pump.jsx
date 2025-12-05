// frontend/src/pages/pump.jsx

import { useEffect, useState } from "react";
import { api } from "../utils/api";
import PumpCard from "../components/PumpCard";

export default function PumpPage() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        api.getTrending().then(res => setCoins(res.trending || []));
    }, []);

    return (
        <div className="page">
            <h1>Trending Pump Coins 🚀</h1>

            <div className="grid">
                {coins.map((c, i) => (
                    <PumpCard key={i} coin={c} />
                ))}
            </div>
        </div>
    );
}
