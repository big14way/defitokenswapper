# DeFi Token Swapper - Agent Guidelines

## Commands
- **Build**: `npm run build` (compiles Next.js app)
- **Test**: `npm test` (runs Jest unit tests), `npm run test:e2e` (runs Cypress E2E tests)
- **Lint**: `npm run lint` (runs ESLint)
- **Dev**: `npm run dev` (starts development server)
- **Deploy**: Use Vercel/Netlify for deployment, or Hardhat for contract deployment

## Architecture
- **Frontend**: Next.js 14 App Router with TypeScript, components in `/src/components`
- **Web3 Integration**: Wagmi + Viem for blockchain interactions, Reown AppKit for wallet modal
- **Contracts**: Uniswap V3 Router for swaps, ERC20 ABIs for approvals
- **State**: React Query for server state, localStorage for history
- **Styling**: Tailwind CSS with custom components

## Code Style
- **Imports**: Use `@/` alias for src directory imports
- **Types**: Strict TypeScript, interfaces for data structures, Wagmi hooks return types
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error Handling**: Try/catch in async functions, Wagmi error handling
- **Formatting**: ESLint + Prettier config, consistent indentation
- **Web3**: Use Viem formatters for addresses/transactions, validate inputs
