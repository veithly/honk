import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://honk.veithly.workers.dev"),
  title: "HONK — 30-second meme coin launcher on Sui",
  description:
    "Paste a name, drop an image, get a vibe score, launch a real Sui coin. Bonding curve in Move, sub-2-second finality, no rug rails.",
  openGraph: {
    title: "HONK — 30-second meme coin launcher on Sui",
    description:
      "Sui-native meme launcher with an AI vibe check. One PTB, one real coin object, no rug rails.",
    images: ["/opengraph-image.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
