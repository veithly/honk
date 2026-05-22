"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/brand/logo";

type LaunchResult = {
  ok: boolean;
  mode: "real" | "dry-run";
  signer: "client" | "server-demo" | "none";
  signerAddress: string | null;
  digest: string | null;
  coin: {
    ticker: string;
    name: string;
    vibe: number;
    freshness: number;
    aquaticBonus: 0 | 1;
    rationale: string;
  };
  note?: string;
};

const SAMPLES = [
  { ticker: "TRUMPBORK", name: "Trump Borking Through the Pond", emojiHint: "duck with a tie" },
  { ticker: "GOOSEFI", name: "GooseFi: Honk-to-Earn Yield", emojiHint: "goose with a calculator" },
  { ticker: "SLOPWALRUS", name: "Slop Walrus the Reluctant", emojiHint: "walrus on a beanbag" },
];

export default function HONKApp() {
  const [sample, setSample] = useState(SAMPLES[0]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LaunchResult | null>(null);

  async function launch() {
    setRunning(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/coins/launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker: sample.ticker,
          name: sample.name,
          emojiHint: sample.emojiHint,
        }),
      });
      const json = (await res.json()) as LaunchResult & { error?: string };
      if (!res.ok || json.error) {
        throw new Error(json.error || `HTTP ${res.status}`);
      }
      setResult(json);
    } catch (e) {
      setError(String((e as Error).message ?? e));
    } finally {
      setRunning(false);
    }
  }

  return (
    <main className="min-h-dvh bg-[#1a1003] text-yellow-50">
      <header className="border-b border-yellow-400/15">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Wordmark className="h-8 text-yellow-50" />
            <span className="rounded-full border border-yellow-300/40 bg-yellow-300/10 px-2 py-0.5 text-[11px] uppercase tracking-wider text-yellow-200">
              testnet
            </span>
          </Link>
          <Link href="/" className="text-sm text-yellow-100/80 hover:text-white">
            ← back
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Step 1 · Pick a meme</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Drop a coin onto Sui</h1>
          <p className="mt-3 max-w-prose text-sm text-yellow-100/80">
            A real user would paste a name + drop an image. For the demo we ship three pre-baked
            memes that the AI vibe-check has already scored.
          </p>

          <div className="mt-6 space-y-3">
            {SAMPLES.map((s) => {
              const active = s.ticker === sample.ticker;
              return (
                <button
                  key={s.ticker}
                  onClick={() => {
                    setSample(s);
                    setResult(null);
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                    active
                      ? "border-yellow-300/70 bg-yellow-300/10"
                      : "border-yellow-400/10 bg-yellow-400/[.03] hover:border-yellow-300/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-yellow-50">${s.ticker}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-200/70">
                      preview
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-yellow-100/80">{s.name}</div>
                  <div className="mt-1 text-[11px] text-yellow-200/60">artwork: {s.emojiHint}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/[.04] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Step 2 · Launch</p>
          <h2 className="mt-3 text-2xl font-extrabold">${sample.ticker}</h2>
          <p className="mt-1 text-sm text-yellow-100/80">{sample.name}</p>

          <button
            onClick={launch}
            disabled={running}
            className="mt-6 w-full rounded-full bg-yellow-400 px-6 py-3 text-sm font-extrabold tracking-wide text-stone-900 transition hover:bg-yellow-300 disabled:cursor-wait disabled:opacity-70"
          >
            {running ? "Vibe-checking + minting…" : `LAUNCH $${sample.ticker} ON SUI`}
          </button>

          {error && (
            <p className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-xs text-red-200">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-4 space-y-4 rounded-xl border border-yellow-300/30 bg-yellow-300/5 p-4 text-xs">
              <div className="flex items-center justify-between text-yellow-200">
                <span className="text-[11px] uppercase tracking-[0.25em]">Coin minted · HONK!</span>
                <span className="rounded-full border border-yellow-300/40 bg-yellow-300/10 px-2 py-0.5 text-[10px] text-yellow-100">
                  {result.mode === "real" ? `Real Move call · ${result.signer}` : "Dry-run"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-xl border border-yellow-400/15 bg-stone-950/40 p-3">
                <Pill label="vibe" value={result.coin.vibe.toFixed(1)} />
                <Pill label="freshness" value={result.coin.freshness.toFixed(1)} />
                <Pill label="aquatic" value={result.coin.aquaticBonus ? "+1" : "0"} />
              </div>

              <p className="text-yellow-100/80">{result.coin.rationale}</p>

              {result.digest ? (
                <a
                  href={`https://testnet.suivision.xyz/txblock/${result.digest}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-[11px] text-yellow-100 underline-offset-4 hover:underline"
                >
                  {result.digest}
                </a>
              ) : (
                <p className="text-yellow-200/80">{result.note}</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/[.04] p-6 text-sm text-yellow-100/80">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Coverage</p>
          <p className="mt-3">
            We ship the launch flow against Sui Testnet using the trial wallet. The
            vibe-check runs against a small reasoning model with a fallback path; the bonding-curve
            launch calls are wired against the published testnet Move package (). Reviewers can connect their own wallet via Mysten dApp Kit and launch from
            their address with the same UX.
          </p>
        </div>
      </section>
    </main>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-stone-900/60 p-2 text-center">
      <div className="text-[10px] uppercase tracking-[0.2em] text-yellow-200/70">{label}</div>
      <div className="mt-1 text-lg font-extrabold text-yellow-50">{value}</div>
    </div>
  );
}
