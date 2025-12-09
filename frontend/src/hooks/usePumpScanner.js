import { useEffect, useState } from "react";
import { getTrending } from "../utils/api";

export default function usePumpScanner(limit = 50) {
    const [trending, setTrending] = useState([]);

    async function load() {
        const data = await getTrending(limit);
        setTrending(data || []);
    }

    useEffect(() => {
        load();
        const interval = setInterval(load, 7000);
        return () => clearInterval(interval);
    }, []);

    return trending;
}
