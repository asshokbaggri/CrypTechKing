export const sleep = (ms) => new Promise(res => setTimeout(res, ms));

export const formatUSD = (num) => {
    try {
        return "$" + Number(num).toLocaleString();
    } catch {
        return "$0";
    }
};
