const HALVING_BLOCK = 1_050_000;
const BLOCK_TIME = 600;

export async function getHalvingData() {
  try {
    const res = await fetch(
      "https://mempool.space/api/blocks/tip/height",
      { cache: "no-store" }
    );

    const currentBlock = await res.json();
    const blocksLeft = HALVING_BLOCK - currentBlock;
    const secondsLeft = blocksLeft * BLOCK_TIME;

    return { currentBlock, blocksLeft, secondsLeft };
  } catch (e) {
    return {
      currentBlock: 0,
      blocksLeft: 0,
      secondsLeft: 0
    };
  }
}
