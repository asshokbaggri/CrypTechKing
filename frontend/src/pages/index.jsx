// frontend/src/pages/index.jsx

import { api } from "../utils/api";
import WhaleCard from "../components/WhaleCard";
import PumpCard from "../components/PumpCard";
import useLiveFeed from "../hooks/useLiveFeed";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const whales = useLiveFeed(); // real-time whales
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        api.getTrending().then(res => setTrending(res.trending || []));
    }, []);

    return (
        <div className="page dashboard">
            <h1>🔥 CrypTechKing Dashboard</h1>

            <section>
                <h2>Live Whale Feed 🐋</h2>
                <div className="grid">
                    {whales.map((w, i) => <WhaleCard key={i} item={w} />)}
                </div>
            </section>

            <section>
                <h2>Trending Pump Coins 🚀</h2>
                <div className="grid">
                    {trending.map((c, i) => <PumpCard key={i} coin={c} />)}
                </div>
            </section>
        </div>
    );
}
