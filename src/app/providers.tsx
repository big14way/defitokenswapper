"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, optimism, base, baseSepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";
import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "1eebe528ca0ce94a99ceaa2e915058d7";

// Configure supported chains
const supportedChains = [mainnet, optimism, base, baseSepolia];

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: supportedChains,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: supportedChains,
  projectId,
  features: {
    analytics: true,
  },
});

const config = createConfig({
  chains: supportedChains,
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_INFURA_KEY ? `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}` : undefined),
    [optimism.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_KEY ? `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}` : undefined),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
