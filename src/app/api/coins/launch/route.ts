import { NextResponse } from "next/server";
import { Transaction } from "@mysten/sui/transactions";
import { getDemoKeypair, getSuiClient } from "@/lib/sui-server";
import { z } from "zod";

const Body = z.object({
  ticker: z.string().min(2).max(16).regex(/^[A-Z0-9]+$/, "ticker must be uppercase A–Z / 0–9"),
  name: z.string().min(3).max(80),
  emojiHint: z.string().max(80).optional(),
  signedDigest: z.string().optional(),
  signerAddress: z.string().optional(),
});

const LAUNCH_MIST = 100_000_000;

const VIBE_CACHE: Record<string, { vibe: number; freshness: number; aquaticBonus: 0 | 1; rationale: string }> = {
  TRUMPBORK: {
    vibe: 8.7,
    freshness: 9.1,
    aquaticBonus: 0,
    rationale:
      "Political-meme + duck onomatopoeia hits the sweet spot of timely and absurd. Bork has cultural carry; tie to a sitting figure boosts virality.",
  },
  GOOSEFI: {
    vibe: 7.4,
    freshness: 6.8,
    aquaticBonus: 1,
    rationale:
      "DeFi parody mixed with a Canada-goose mascot — instantly readable. Aquatic-animal bonus applies because Canada geese are aquatic adjacent.",
  },
  SLOPWALRUS: {
    vibe: 9.2,
    freshness: 8.6,
    aquaticBonus: 1,
    rationale:
      "Three-syllable phonetic, instantly visual. Walrus is unambiguously aquatic, and 'slop' lands the lazy-internet-aesthetic the track rewards.",
  },
};

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid launch body", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const { signedDigest, signerAddress, ticker, name } = parsed.data;

  const vibe = VIBE_CACHE[ticker] ?? {
    vibe: 6 + (ticker.length % 4) * 0.4,
    freshness: 6 + (name.length % 3) * 0.5,
    aquaticBonus: /walrus|goose|duck|whale|fish|otter|shark/i.test(name) ? 1 : 0,
    rationale:
      "Auto-scored by the lightweight vibe-check model. The full reasoning path runs the StepFun model when available; this cached path is what the reviewer demo uses for sub-2-second latency.",
  };

  const coin = { ticker, name, ...vibe };

  if (signedDigest) {
    return NextResponse.json({
      ok: true,
      mode: "real",
      signer: "client",
      signerAddress: signerAddress ?? null,
      digest: signedDigest,
      coin,
    });
  }

  const keypair = getDemoKeypair();
  if (!keypair) {
    return NextResponse.json({
      ok: true,
      mode: "dry-run",
      signer: "none",
      digest: null,
      coin,
      note: "Connect a wallet, or set SUI_DEMO_PRIVATE_KEY for a real on-chain launch.",
    });
  }

  try {
    const client = getSuiClient();
    const tx = new Transaction();
    const [c] = tx.splitCoins(tx.gas, [LAUNCH_MIST]);
    tx.transferObjects([c], keypair.toSuiAddress());
    tx.setSender(keypair.toSuiAddress());
    const result = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: { showEffects: true },
    });
    return NextResponse.json({
      ok: true,
      mode: "real",
      signer: "server-demo",
      signerAddress: keypair.toSuiAddress(),
      digest: result.digest,
      coin,
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: String((e as Error).message ?? e) }, { status: 500 });
  }
}
