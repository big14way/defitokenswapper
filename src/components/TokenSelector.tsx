"use client";

import { useState } from "react";

interface Token {
  symbol: string;
  address: string;
  decimals: number;
}

interface TokenSelectorProps {
  tokens: Token[];
  selected: Token;
  onSelect: (token: Token) => void;
}

export default function TokenSelector({ tokens, selected, onSelect }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border rounded flex justify-between items-center"
      >
        {selected.symbol}
        <span>▼</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-full bg-white border rounded shadow z-10">
          {tokens.map((token) => (
            <button
              key={token.address}
              onClick={() => {
                onSelect(token);
                setIsOpen(false);
              }}
              className="w-full p-2 text-left hover:bg-gray-100"
            >
              {token.symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
