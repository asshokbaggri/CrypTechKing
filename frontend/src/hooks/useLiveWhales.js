import { useEffect, useState } from "react";
import { getWhales } from "../utils/api";

export default function useLiveWhales(limit = 50) {
    const [whales, setWhales] = useState([]);

    async function load() {
        const data = await getWhales(limit);
        if (data) setWhales(data);
    }

    useEffect(() => {
        load();
        const interval = setInterval(load, 5000);
        return () => clearInterval(interval);
    }, []);

    return whales;
}
