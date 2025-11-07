"use client";

import { useState, useEffect } from "react";
import { useAccount, useBalance, useReadContract, useWriteContract } from "wagmi";
import { formatEther, parseEther } from "viem";
import TokenSelector from "./TokenSelector";
import TxButton from "./TxButton";
import { erc20Abi } from "viem";
import { getSwapQuote } from "@/lib/utils";
import { tokenSwapperAbi, TOKEN_SWAPPER_ADDRESS } from "@/lib/contracts";

// Hardcoded tokens
const TOKENS = [
  { symbol: "ETH", address: "0x0000000000000000000000000000000000000000", decimals: 18 },
  { symbol: "USDC", address: "0xA0b86a33E6441e88C5B0A1A3e4e5C8f2d9e5F2a6", decimals: 6 }, // Example
  { symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18 },
];

export default function SwapForm() {
  const { address, isConnected } = useAccount();
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<string | null>(null);
  const [slippage, setSlippage] = useState(0.5); // 0.5%
  const [deadline, setDeadline] = useState(10); // 10 minutes
  const [priceImpact, setPriceImpact] = useState<number | null>(null);

  // Fetch quote
  useEffect(() => {
    if (amount && fromToken && toToken) {
      getSwapQuote(fromToken.address, toToken.address, amount).then((q) => {
        setQuote(q);
        // Simple price impact calc: assume 0.1% for demo
        setPriceImpact(0.1);
      });
    } else {
      setQuote(null);
      setPriceImpact(null);
    }
  }, [amount, fromToken, toToken]);

  // Fetch balances
  const { data: fromBalance } = useBalance({
    address,
    token: fromToken.address === "0x0000000000000000000000000000000000000000" ? undefined : fromToken.address as `0x${string}`,
  });

  // Approval check (for ERC20)
  const { data: allowance } = useReadContract({
    address: fromToken.address as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address!, TOKEN_SWAPPER_ADDRESS as `0x${string}`], // TokenSwapper Contract
    query: {
      enabled: isConnected && fromToken.address !== "0x0000000000000000000000000000000000000000",
    },
  });

  const { writeContract, isPending } = useWriteContract();

  const handleSwap = () => {
    if (!amount) return;

    // Call TokenSwapper contract which wraps Uniswap V3
    writeContract({
      address: TOKEN_SWAPPER_ADDRESS as `0x${string}`,
      abi: tokenSwapperAbi,
      functionName: "swapExactInputSingle",
      args: [
        fromToken.address as `0x${string}`,
        toToken.address as `0x${string}`,
        3000, // 0.3% fee tier
        parseEther(amount),
        parseEther(quote || "0") * BigInt(1000 - slippage * 10) / BigInt(1000), // Custom slippage
        Math.floor(Date.now() / 1000) + deadline * 60, // Custom deadline
      ],
    });
  };

  const handleApprove = () => {
    writeContract({
      address: fromToken.address as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [TOKEN_SWAPPER_ADDRESS as `0x${string}`, parseEther(amount)],
    });
  };

  const needsApproval = fromToken.address !== "0x0000000000000000000000000000000000000000" &&
    allowance && allowance < parseEther(amount || "0");

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Swap Tokens</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">From</label>
        <TokenSelector tokens={TOKENS} selected={fromToken} onSelect={setFromToken} />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full mt-2 p-2 border rounded"
        />
        <p className="text-sm text-gray-600">Balance: {fromBalance ? formatEther(fromBalance.value) : "0"} {fromToken.symbol}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">To</label>
        <TokenSelector tokens={TOKENS} selected={toToken} onSelect={setToToken} />
        <div className="mt-2 p-2 border rounded bg-gray-50">
          {quote ? `~${quote} ${toToken.symbol}` : "Enter amount to get quote"}
        </div>
        {priceImpact && (
          <p className="text-sm text-gray-600 mt-1">Price Impact: {priceImpact.toFixed(2)}%</p>
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Slippage (%)</label>
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value))}
            step="0.1"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Deadline (min)</label>
          <input
            type="number"
            value={deadline}
            onChange={(e) => setDeadline(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <TxButton
        onClick={needsApproval ? handleApprove : handleSwap}
        disabled={!isConnected || !amount}
        loading={isPending}
      >
        {needsApproval ? "Approve" : "Swap"}
      </TxButton>
    </div>
  );
}
