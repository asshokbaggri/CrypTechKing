// frontend/src/hooks/useLiveFeed.js

import { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function useLiveFeed(interval = 5000) {
    const [data, setData] = useState([]);

    const load = async () => {
        const res = await api.getWhales();
        setData(res.whales || []);
    };

    useEffect(() => {
        load();
        const timer = setInterval(load, interval);
        return () => clearInterval(timer);
    }, []);

    return data;
}
