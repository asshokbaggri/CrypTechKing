import { useEffect, useState } from "react";
import { getSmartMoneySummary } from "../utils/api";

export default function useSmartMoney() {
    const [stats, setStats] = useState(null);

    async function load() {
        const data = await getSmartMoneySummary();
        setStats(data);
    }

    useEffect(() => {
        load();
        const interval = setInterval(load, 8000);
        return () => clearInterval(interval);
    }, []);

    return stats;
}
