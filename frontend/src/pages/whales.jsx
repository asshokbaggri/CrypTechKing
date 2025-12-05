// frontend/src/pages/whales.jsx

import useLiveFeed from "../hooks/useLiveFeed";
import WhaleCard from "../components/WhaleCard";

export default function WhalesPage() {
    const whales = useLiveFeed();

    return (
        <div className="page">
            <h1>Whale Activity 🐋</h1>

            <div className="grid">
                {whales.map((w, i) => (
                    <WhaleCard key={i} item={w} />
                ))}
            </div>
        </div>
    );
}
