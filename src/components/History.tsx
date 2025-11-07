"use client";

import { useEffect, useState } from "react";

interface SwapHistory {
  id: string;
  fromToken: string;
  toToken: string;
  amountIn: string;
  amountOut: string;
  txHash: string;
  timestamp: number;
}

export default function History() {
  const [history, setHistory] = useState<SwapHistory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("swapHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addToHistory = (swap: Omit<SwapHistory, "id" | "timestamp">) => {
    const newSwap: SwapHistory = {
      ...swap,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    const updated = [newSwap, ...history];
    setHistory(updated);
    localStorage.setItem("swapHistory", JSON.stringify(updated));
  };

  // Expose addToHistory to parent via context or callback
  // For now, assume it's called after successful tx

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Swap History</h3>
      {history.length === 0 ? (
        <p>No swaps yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((swap) => (
            <li key={swap.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <p>{swap.amountIn} {swap.fromToken} → {swap.amountOut} {swap.toToken}</p>
              <a
                href={`https://etherscan.io/tx/${swap.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View on Etherscan
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
