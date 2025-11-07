"use client";

import { useEffect, useState } from "react";
import SwapForm from "@/components/SwapForm";
import History from "@/components/History";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = async () => {
    if (typeof window !== 'undefined') {
      const { useAppKit } = await import("@reown/appkit/react");
      // Dynamic import to avoid SSR issues
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold">DeFi Token Swapper</h1>
        {mounted && (
          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Connect Wallet
          </button>
        )}
      </header>
      <main className="container mx-auto p-4">
        {mounted && (
          <>
            <SwapForm />
            <History />
          </>
        )}
      </main>
    </div>
  );
}
