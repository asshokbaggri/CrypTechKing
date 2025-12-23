export const HALVING_BLOCK = 1050000;
export const AVG_BLOCK_TIME = 600; // seconds

export function calculateHalving(currentBlock: number) {
  const remainingBlocks = HALVING_BLOCK - currentBlock;
  const remainingSeconds = remainingBlocks * AVG_BLOCK_TIME;

  return {
    remainingBlocks,
    remainingSeconds
  };
}
