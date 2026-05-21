"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DAppKitProvider } from "@mysten/dapp-kit-react";
import { useEffect, useState } from "react";
import { getDAppKit } from "@/lib/dapp-kit";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, retry: 1 },
        },
      }),
  );
  const [dAppKit, setDAppKit] = useState<ReturnType<typeof getDAppKit> | null>(null);
  useEffect(() => {
    setDAppKit(getDAppKit());
  }, []);

  if (!dAppKit) {
    // SSR + first paint: render the tree without wallet wiring so prerender
    // succeeds. Wallet UI hydrates as soon as the client kit is ready.
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>
    </QueryClientProvider>
  );
}
