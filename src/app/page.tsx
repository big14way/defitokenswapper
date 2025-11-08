"use client";

import { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import SwapForm from "@/components/SwapForm";
import History from "@/components/History";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold">DeFi Token Swapper</h1>
        <div className="flex items-center gap-4">
          {isConnected && address && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          )}
          <button
            onClick={() => open()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isConnected ? "My Wallet" : "Connect Wallet"}
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <SwapForm />
        <History />
      </main>
    </div>
  );
}
