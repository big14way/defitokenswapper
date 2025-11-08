"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { mainnet, optimism, base, baseSepolia } from "wagmi/chains";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "1eebe528ca0ce94a99ceaa2e915058d7";

// Configure supported chains
const chains = [mainnet, optimism, base, baseSepolia] as const;

// Create WagmiAdapter instance
const wagmiAdapter = new WagmiAdapter({
  networks: chains as any,
  projectId,
});

// Create AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, optimism, base, baseSepolia],
  metadata: {
    name: "DeFi Token Swapper",
    description: "Swap tokens on multiple chains using Uniswap V3",
    url: "https://defitokenswapper.vercel.app",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  features: {
    analytics: true,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
