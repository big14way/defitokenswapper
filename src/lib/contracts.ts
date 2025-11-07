import TokenSwapperABI from './TokenSwapperABI.json';

// TokenSwapper Contract Address (deployed on Base Sepolia)
export const TOKEN_SWAPPER_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_SWAPPER_ADDRESS || "0x85e3569ef3DDEE12Bb68772d2Cf73612e82e39Ea";

// TokenSwapper ABI
export const tokenSwapperAbi = TokenSwapperABI;

// ERC20 ABI (for token approvals and balances)
export const erc20Abi = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
] as const;

// Common token addresses on Base Sepolia
export const TOKENS = {
  WETH: "0x4200000000000000000000000000000000000006",
  // Add more tokens as needed for testing
};
