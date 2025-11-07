const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("TokenSwapper", function () {
  async function deploySwapperFixture() {
    const [owner, user] = await ethers.getSigners();

    // Deploy mock tokens for testing
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const tokenA = await MockERC20.deploy("TokenA", "TKA");
    const tokenB = await MockERC20.deploy("TokenB", "TKB");

    // For testing, we'll use a mock router or skip the actual swap
    const mockRouterAddress = ethers.ZeroAddress; // We'll modify the contract for testing

    const TokenSwapper = await ethers.getContractFactory("TokenSwapper");
    const swapper = await TokenSwapper.deploy(mockRouterAddress);

    // Mint tokens to user
    await tokenA.mint(user.address, ethers.parseEther("1000"));
    await tokenB.mint(user.address, ethers.parseEther("1000"));

    return { swapper, tokenA, tokenB, owner, user };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { swapper, owner } = await loadFixture(deploySwapperFixture);
      expect(await swapper.owner()).to.equal(owner.address);
    });
  });

  describe("Withdrawals", function () {
    it("Should allow owner to withdraw tokens", async function () {
      const { swapper, tokenA, owner } = await loadFixture(deploySwapperFixture);

      // Send some tokens to contract
      await tokenA.mint(swapper.target, ethers.parseEther("100"));

      await expect(swapper.withdrawToken(tokenA.target, ethers.parseEther("50")))
        .to.changeTokenBalances(tokenA, [swapper, owner], [ethers.parseEther("-50"), ethers.parseEther("50")]);
    });

    it("Should not allow non-owner to withdraw", async function () {
      const { swapper, tokenA, user } = await loadFixture(deploySwapperFixture);

      await expect(swapper.connect(user).withdrawToken(tokenA.target, ethers.parseEther("50")))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Swaps", function () {
    it("Should revert swap with invalid router", async function () {
      const { swapper, tokenA, tokenB, user } = await loadFixture(deploySwapperFixture);

      // Approve tokens
      await tokenA.connect(user).approve(swapper.target, ethers.parseEther("100"));

      // Try to swap - should revert because router is ZeroAddress
      await expect(
        swapper.connect(user).swapExactInputSingle(
          tokenA.target,
          tokenB.target,
          3000, // 0.3% fee
          ethers.parseEther("10"),
          ethers.parseEther("9"), // minimum output
          Math.floor(Date.now() / 1000) + 3600 // deadline
        )
      ).to.be.reverted; // Should revert because router is not set properly
    });
  });
});
