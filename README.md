# DeFi Token Swapper

A modern DeFi token swapping dApp built with Next.js 14, TypeScript, and integrated with WalletConnect for seamless wallet connections.

## Features

- **Wallet Integration**: Connect wallets via WalletConnect modal
- **Token Swapping**: Swap between ETH, USDC, and DAI on Ethereum and Optimism
- **Real-time Quotes**: Fetch live swap quotes with Uniswap V3
- **Advanced Settings**: Custom slippage tolerance and transaction deadlines
- **Price Impact**: Display estimated price impact for swaps
- **Transaction History**: Local storage of past swaps with Etherscan links
- **Gas Estimation**: Simulate gas costs before execution

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Web3**: Wagmi v2, Viem v2, Uniswap V3 SDK
- **Wallet**: Reown AppKit (@reown/appkit@1.8.12)
- **UI**: Custom components with Tailwind CSS
- **Testing**: Jest for unit tests, Cypress for E2E tests

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/big14way/defitokenswapper.git
   cd defitokenswapper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
   Required variables:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Your WalletConnect project ID from https://cloud.walletconnect.com
   - `NEXT_PUBLIC_TOKEN_SWAPPER_ADDRESS`: Deployed contract address (see below)
   
   Optional variables (chains have built-in RPC endpoints):
   - `NEXT_PUBLIC_INFURA_KEY`: Your Infura API key for Ethereum/Optimism
   - `NEXT_PUBLIC_ALCHEMY_KEY`: Your Alchemy API key for enhanced performance

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to open the WalletConnect modal.
2. **Select Tokens**: Choose from and to tokens (ETH, USDC, DAI).
3. **Enter Amount**: Input the amount to swap.
4. **Review Quote**: Check the estimated output and price impact.
5. **Adjust Settings**: Modify slippage and deadline if needed.
6. **Approve & Swap**: Approve token spending if required, then execute the swap.
7. **View History**: Check past swaps in the history section.

## Testing

### Unit Tests (Frontend)
```bash
npm test
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Smart Contract Tests
```bash
npm run test:contracts
```

## Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_TOKEN_SWAPPER_ADDRESS=0x85e3569ef3DDEE12Bb68772d2Cf73612e82e39Ea
   ```

4. **Production Deployment**:
   ```bash
   vercel --prod
   ```

### Alternative: Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify Dashboard:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_TOKEN_SWAPPER_ADDRESS`
4. Deploy!

### Environment Variables for Production

**Required**:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Get from https://cloud.walletconnect.com
- `NEXT_PUBLIC_TOKEN_SWAPPER_ADDRESS`: Deployed contract address

**Optional** (for custom RPC endpoints):
- `NEXT_PUBLIC_INFURA_KEY`: Infura project key
- `NEXT_PUBLIC_ALCHEMY_KEY`: Alchemy API key

## Smart Contracts

The project includes Solidity contracts for token swapping using Uniswap V3:

### Contracts
- **TokenSwapper.sol**: Main swap contract integrating Uniswap V3 Router
  - Supports swaps between any ERC20 tokens
  - Configurable slippage and deadline
  - Owner-controlled emergency withdrawals
- **MockERC20.sol**: Test token contract for local development

### Deployed Contracts

#### Base Sepolia Testnet
- **TokenSwapper**: `0x85e3569ef3DDEE12Bb68772d2Cf73612e82e39Ea`
- **Uniswap V3 Router**: `0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4`
- **Network**: Base Sepolia (Chain ID: 84532)
- **Explorer**: https://sepolia.basescan.org/address/0x85e3569ef3DDEE12Bb68772d2Cf73612e82e39Ea

### Contract Deployment Guide

The contracts are deployed using Hardhat. To deploy to a new network:

#### Prerequisites
1. Create a `contracts/.env` file with your private key:
   ```bash
   PRIVATE_KEY=0xyour_private_key_here
   basescan_api_key=your_basescan_api_key_here
   ```
   **⚠️ NEVER commit this file to git!**

2. Ensure you have testnet ETH (for Base Sepolia, get from https://faucet.quicknode.com/base/sepolia)

#### Deploy to Base Sepolia
```bash
npm run compile           # Compile contracts
npm run deploy:base-sepolia
```

#### Deploy to Base Mainnet
```bash
npm run deploy:base
```

#### After Deployment
1. Copy the deployed contract address from the console output
2. Update `.env.local`:
   ```
   NEXT_PUBLIC_TOKEN_SWAPPER_ADDRESS=0xYourDeployedAddress
   ```
3. The contract will be automatically verified on Basescan if configured correctly

## Project Structure

```
/
├── contracts/          # Solidity contracts
│   ├── TokenSwapper.sol
│   └── MockERC20.sol
├── scripts/            # Deployment scripts
│   └── deploy.js
├── test/               # Contract tests
│   └── TokenSwapper.test.js
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Main swap page
│   │   └── providers.tsx       # Wagmi and QueryClient providers
│   ├── components/
│   │   ├── SwapForm.tsx        # Main swap form component
│   │   ├── TokenSelector.tsx   # Token dropdown selector
│   │   ├── TxButton.tsx        # Transaction button with loading
│   │   └── History.tsx         # Swap history display
│   ├── lib/
│   │   ├── utils.ts            # Utility functions
│   │   └── contracts.ts        # Contract ABIs and addresses
│   └── __tests__/
│       └── utils.test.ts       # Unit tests
├── hardhat.config.cjs  # Hardhat configuration
└── package.json
```

## Supported Networks

The dApp supports the following blockchain networks:

| Network | Chain ID | Status | Purpose |
|---------|----------|--------|---------|
| Ethereum Mainnet | 1 | ✅ Active | Production swaps |
| Optimism | 10 | ✅ Active | L2 production swaps |
| Base | 8453 | ✅ Active | L2 production swaps |
| Base Sepolia | 84532 | ✅ Active | Testing (current deployment) |

### Network Configuration

All networks are pre-configured in `src/app/providers.tsx`. The dApp will automatically:
- Prompt users to switch networks if on unsupported chain
- Use default RPC endpoints (or custom if configured)
- Show appropriate block explorers for transaction links

## Security Notes

- Always review transactions in your wallet before signing.
- Use reasonable slippage tolerances to avoid front-running.
- Test on testnets before mainnet usage.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Disclaimer

This is a demo application for educational purposes. Use at your own risk. Always do your own research before interacting with DeFi protocols.
