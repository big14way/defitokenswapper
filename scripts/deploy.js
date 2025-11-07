import { ethers } from "hardhat";
import { run } from "hardhat";

async function main() {
  console.log("Deploying TokenSwapper...");

  // For Base Sepolia, we need to check if Uniswap V3 router is deployed
  // If not, we might need to use a different DEX or deploy our own AMM

  // Placeholder router address - replace with actual deployed router on Base Sepolia
  const SWAP_ROUTER_ADDRESS = "0x2626664c2603336E57B271c5C0b26F421741e4815"; // Uniswap V3 Router on Base

  const TokenSwapper = await ethers.getContractFactory("TokenSwapper");
  const swapper = await TokenSwapper.deploy(SWAP_ROUTER_ADDRESS);

  await swapper.waitForDeployment();

  console.log("TokenSwapper deployed to:", swapper.target);

  // Verify contract if on mainnet/testnet
  if (network.name !== "hardhat") {
    console.log("Verifying contract...");
    try {
      await run("verify:verify", {
        address: swapper.target,
        constructorArguments: [SWAP_ROUTER_ADDRESS],
      });
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
