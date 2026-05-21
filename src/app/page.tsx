import Link from "next/link";
import { Wordmark } from "@/components/brand/logo";

export default function Home() {
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
          <div className="flex items-center gap-5 text-sm text-yellow-100/80">
            <Link href="/about" className="hover:text-white">
              How it works
            </Link>
            <Link
              href="/app"
              className="rounded-full bg-yellow-400 px-4 py-1.5 font-semibold text-stone-900 hover:bg-yellow-300"
            >
              Launch a coin
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">
            Degen track · Sui Overflow 2026
          </p>
          <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Launch a meme coin in 30 seconds. With a vibe check.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-yellow-100/80">
            HONK is a Sui-native meme launcher with a built-in AI vibe filter. Paste a name, drop
            an image, get scored 0–10. Score &gt; 5 launches. One PTB mints a bonded coin object on
            Sui — you can buy and sell back into the curve immediately.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-stone-900 hover:bg-yellow-300"
            >
              Launch a coin →
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-yellow-400/30 px-6 py-3 text-sm text-yellow-100 hover:border-yellow-300/60"
            >
              How it works
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 text-sm">
            <Stat label="Vibe-check latency" value="≤ 2 s" />
            <Stat label="Launch latency" value="≤ 30 s" />
            <Stat label="Bonding curve" value="linear" />
          </dl>
        </div>

        <aside className="relative rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-orange-400/5 p-6 shadow-[0_8px_60px_-20px_rgba(250,204,21,0.55)] backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.3em] text-yellow-300">Live launch</p>
          <h2 className="mt-2 text-xl font-extrabold">$TRUMPBORK</h2>
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-yellow-400/20 bg-stone-950/40 p-4 text-xs">
            <Pill label="vibe" value="8.7" tone="green" />
            <Pill label="freshness" value="9.1" tone="green" />
            <Pill label="aquatic?" value="0" tone="muted" />
          </div>
          <div className="mt-5 grid gap-2 rounded-xl border border-yellow-400/15 bg-black/30 p-4 text-xs text-yellow-100/80">
            <Row k="Curve" v="Linear 0 → $1k mcap" />
            <Row k="Creator fee" v="1%" />
            <Row k="Last buy" v="+0.3 SUI · 4s ago" />
            <Row k="Honks" v="42" />
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h3 className="text-2xl font-extrabold tracking-tight">Why HONK is not pump.fun.</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card kicker="01" title="Vibe filter" body="AI scores the launch before the chain sees it. Garbage gets bounced before it&apos;s minted." />
          <Card kicker="02" title="Real Sui coin" body="MemeCoin is a Sui coin object — composable, transferable, queryable. Not a database row." />
          <Card kicker="03" title="No rug rails" body="Bonding curve is in Move. The creator can&apos;t pull the floor; sells return SUI from the curve." />
        </div>
      </section>

      <footer className="border-t border-yellow-400/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-yellow-100/60">
          <Link href="/" className="flex items-center gap-2">
            <Wordmark className="h-6 text-yellow-100/80" />
          </Link>
          <span>Built for Sui Overflow 2026 · Degen track</span>
        </div>
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.25em] text-yellow-300/80">{label}</dt>
      <dd className="mt-1 text-2xl font-extrabold text-yellow-50">{value}</dd>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-yellow-400/10 pb-2 last:border-none">
      <span className="text-yellow-300/80">{k}</span>
      <span className="font-medium text-yellow-50">{v}</span>
    </div>
  );
}

function Pill({ label, value, tone }: { label: string; value: string; tone: "green" | "muted" }) {
  const color = tone === "green" ? "text-emerald-200" : "text-yellow-100/60";
  return (
    <div className="rounded-xl bg-stone-900/60 p-2 text-center">
      <div className="text-[10px] uppercase tracking-[0.2em] text-yellow-200/70">{label}</div>
      <div className={`mt-1 text-lg font-bold ${color}`}>{value}</div>
    </div>
  );
}

function Card({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/[.04] p-5">
      <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-yellow-300/80">{kicker}</p>
      <h4 className="mt-2 text-lg font-bold">{title}</h4>
      <p className="mt-2 text-sm text-yellow-100/80">{body}</p>
    </div>
  );
}
