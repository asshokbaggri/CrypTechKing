export function formatAmount(number) {
    if (!number || isNaN(number)) return "0";

    number = Number(number);

    if (number >= 1e12) return (number / 1e12).toFixed(2) + "T";
    if (number >= 1e9) return (number / 1e9).toFixed(2) + "B";
    if (number >= 1e6) return (number / 1e6).toFixed(2) + "M";
    if (number >= 1e3) return (number / 1e3).toFixed(2) + "K";

    return number.toString();
}

export function formatTime(timestamp) {
    if (!timestamp) return "—";
    return new Date(timestamp * 1000).toLocaleTimeString();
}
