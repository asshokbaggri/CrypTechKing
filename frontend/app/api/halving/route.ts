import { NextResponse } from "next/server";
import { calculateHalving } from "../../../../lib/halving";

export const revalidate = 15;

export async function GET() {
  const heightRes = await fetch(
    "https://blockstream.info/api/blocks/tip/height"
  );
  const currentBlock = await heightRes.text();

  const data = calculateHalving(Number(currentBlock));

  return NextResponse.json({
    currentBlock: Number(currentBlock),
    ...data
  });
}
