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
   Copy `.env.example` to `.env.local` and fill in your API keys:
   ```bash
   cp .env.example .env.local
   ```
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Your WalletConnect project ID (provided)
   - `NEXT_PUBLIC_INFURA_KEY`: Your Infura API key
   - `NEXT_PUBLIC_ALCHEMY_KEY`: Your Alchemy API key

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

### Unit Tests
```bash
npm test
```

### End-to-End Tests
```bash
npm run test:e2e
```

## Deployment

### Vercel/Netlify
1. Push your code to GitHub.
2. Connect your repository to Vercel or Netlify.
3. Set environment variables in the deployment platform.
4. Deploy!

### Testnet Deployment
For Base Sepolia testnet deployment:
1. Add your private key to `.env.local` as `PRIVATE_KEY`.
2. Use Hardhat or similar to deploy contracts if needed.
3. Update RPC URLs for Base Sepolia.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main swap page
│   └── providers.tsx       # Wagmi and QueryClient providers
├── components/
│   ├── SwapForm.tsx        # Main swap form component
│   ├── TokenSelector.tsx   # Token dropdown selector
│   ├── TxButton.tsx        # Transaction button with loading
│   └── History.tsx         # Swap history display
├── lib/
│   ├── utils.ts            # Utility functions
│   └── contracts.ts        # Contract ABIs and addresses
└── __tests__/
    └── utils.test.ts       # Unit tests
```

## Supported Networks

- Ethereum Mainnet
- Optimism

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
