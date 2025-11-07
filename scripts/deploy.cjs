const hre = require("hardhat");
const { ethers, network, run } = hre;

async function main() {
  console.log(`Deploying TokenSwapper to ${network.name}...`);

  // Uniswap V3 SwapRouter addresses
  const ROUTER_ADDRESSES = {
    base: "0x2626664c2603336E57B271c5C0b26F421741e481", // Uniswap V3 Router on Base Mainnet
    baseSepolia: "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4" // Uniswap V3 SwapRouter on Base Sepolia
  };

  const SWAP_ROUTER_ADDRESS = ROUTER_ADDRESSES[network.name] || ROUTER_ADDRESSES.baseSepolia;
  
  console.log(`Using SwapRouter at: ${SWAP_ROUTER_ADDRESS}`);

  const TokenSwapper = await ethers.getContractFactory("TokenSwapper");
  const swapper = await TokenSwapper.deploy(SWAP_ROUTER_ADDRESS);

  await swapper.waitForDeployment();

  const deployedAddress = await swapper.getAddress();
  console.log("TokenSwapper deployed to:", deployedAddress);
  console.log("Deployment tx:", swapper.deploymentTransaction()?.hash);

  // Wait for a few block confirmations before verifying
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting for 5 block confirmations...");
    await swapper.deploymentTransaction()?.wait(5);
    
    console.log("Verifying contract on Basescan...");
    try {
      await run("verify:verify", {
        address: deployedAddress,
        constructorArguments: [SWAP_ROUTER_ADDRESS],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }

  // Output deployment info for frontend
  console.log("\n=== Deployment Summary ===");
  console.log(`Network: ${network.name}`);
  console.log(`TokenSwapper Address: ${deployedAddress}`);
  console.log(`SwapRouter Address: ${SWAP_ROUTER_ADDRESS}`);
  console.log("========================\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
