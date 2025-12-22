export const HALVING_BLOCK = 1050000;
export const BLOCK_TIME = 10 * 60; // seconds

export async function getCurrentBlock() {
  const res = await fetch(
    "https://mempool.space/api/blocks/tip/height",
    { cache: "no-store" }
  );
  return await res.json();
}

export function estimateHalvingDate(blocksRemaining) {
  const seconds = blocksRemaining * BLOCK_TIME;
  return new Date(Date.now() + seconds * 1000);
}
