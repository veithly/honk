import Link from "next/link";
import { Wordmark } from "@/components/brand/logo";

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-[#1a1003] text-yellow-50">
      <header className="border-b border-yellow-400/15">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Wordmark className="h-8 text-yellow-50" />
          </Link>
          <Link href="/app" className="text-sm text-yellow-100/80 hover:text-white">
            Launch a coin →
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="text-[11px] uppercase tracking-[0.3em] text-yellow-300/80">Architecture &amp; rationale</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">HONK in 60 seconds.</h1>
        <p className="mt-3 max-w-2xl text-base text-yellow-100/80">
          A meme launcher with three layers — an AI vibe filter that blocks garbage, a Move bonding
          curve that owns the floor, and a UI that gets you from idea to live coin in under 30
          seconds.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">Move package</h2>
        <pre className="mt-3 overflow-x-auto rounded-2xl border border-yellow-400/20 bg-black/40 p-5 text-xs leading-relaxed text-yellow-50">
{`module honk::coin {
    struct MemeCoin<phantom T> has key {
        id: UID,
        creator: address,
        ticker: vector<u8>,
        name: vector<u8>,
        image_blob: vector<u8>,
        supply: u64,
        curve_params: CurveParams,
        fee_bps: u16,
    }

    public entry fun buy<T>(c: &mut MemeCoin<T>, sui_in: Coin<SUI>, ctx: &mut TxContext) { /* ... */ }
    public entry fun sell<T>(c: &mut MemeCoin<T>, meme_in: Coin<T>, ctx: &mut TxContext) { /* ... */ }
}`}
        </pre>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">Vibe filter</h2>
        <p className="mt-3 max-w-2xl text-base text-yellow-100/80">
          A small reasoning model scores the launch on three axes: vibe (humour/cultural-fit),
          freshness (how recent and unsaturated), and aquatic-animal bonus (the Degen track loves
          aquatic mascots). Score &lt; 5 blocks the mint client-side; 5–7 throws a warning; 7+ green-lights.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">Why on Sui</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-yellow-100/80">
          <li>Coin objects let us model each meme as a first-class on-chain asset.</li>
          <li>Bonding curve in Move means the creator can&apos;t rug the floor — sells always return SUI from the curve.</li>
          <li>Sub-2s finality keeps the &quot;30-second launch&quot; promise honest.</li>
          <li>Switchable signer: connect your own wallet via Mysten dApp Kit, or use the hosted trial wallet for review.</li>
        </ul>
      </section>

      <footer className="border-t border-yellow-400/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-yellow-100/60">
          <span>Built for Sui Overflow 2026 · Degen track</span>
          <Link href="/app" className="text-yellow-100 hover:text-white">
            Try the launcher →
          </Link>
        </div>
      </footer>
    </main>
  );
}
