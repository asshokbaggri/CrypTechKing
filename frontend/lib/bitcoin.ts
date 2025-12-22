const HALVING_BLOCK = 1_050_000;
const BLOCK_TIME = 600; // seconds (10 min)

export async function getHalvingData() {
  const res = await fetch(
    "https://mempool.space/api/blocks/tip/height",
    { cache: "no-store" }
  );

  const currentBlock = await res.json();
  const blocksLeft = HALVING_BLOCK - currentBlock;
  const secondsLeft = blocksLeft * BLOCK_TIME;

  return {
    currentBlock,
    blocksLeft,
    secondsLeft
  };
}
