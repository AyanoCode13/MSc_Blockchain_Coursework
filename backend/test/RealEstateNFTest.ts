import { expect } from "chai";
import hre from "hardhat";

describe("RealEstateNFTest", function () {
  let contract:any, deployer:any, acc1:any, acc2:any, acc3:any
  beforeEach(async function () {
    //Get the signers
    [deployer, acc1, acc2, acc3] = await hre.ethers.getSigners()
    //Delploy the contract
    const RealEstateNFT = await hre.ethers.getContractFactory("RealEstateNFT");
    contract = await RealEstateNFT.deploy(deployer, "RealEstateNFT", "RENFT");
    await contract.waitForDeployment();

    
  })
  describe("deployment", () => {
    it("should deploy the contract", async () => {
      expect(await contract.owner()).to.equal(deployer.address)
    });
  })
  describe("mint token", function(){
    it("should mint a token", async () => {
      const prev_acc_balance:BigInt = await contract.balanceOf(acc1.address);
      await contract.connect(acc1).listProperty("https://www.google.com")
      //Check if the total number of tokens has been increased
      expect(await contract.totalSupply()).to.equal(1)
      //Check if the owner of the first token is the tranzaction sender
      expect(await contract.ownerOf(0)).to.equal(acc1.address)
      //Check if the sernder's balance has been increased by 1
      expect(await contract.balanceOf(acc1.address)).to.equal(prev_acc_balance.valueOf() + BigInt(1))

    });
    
  })
  describe("delete token", function() {
    beforeEach(async function(){
      await contract.connect(acc1).listProperty("https://www.google.com")
    })
    it("should delete a token", async ()=>{
      const prev_acc_balance:BigInt = await contract.balanceOf(acc1.address);
      await contract.connect(acc1).unlistProperty(0)
      //Check if the total number of tokens has been decreased
      expect(await contract.totalSupply()).to.equal(0)
      //Check if the owner of the first token is the tranzaction sender
      expect(await contract.balanceOf(acc1.address)).to.equal(prev_acc_balance.valueOf() - BigInt(1))
    })
  })

  describe("transfer token", function() {
    
    it("should transfer a token", async ()=>{
      await contract.connect(acc1).listProperty("abc")
      const prev_acc1_balance:BigInt = await contract.balanceOf(acc1.address);
      const prev_acc2_balance:BigInt = await contract.balanceOf(acc2.address);   
      await contract.connect(acc2).buyProperty(0,1, {value:1})
      //Check if the owner of the first token is the tranzaction sender
      expect(await contract.ownerOf(0)).to.equal(acc2.address)
      // //Check if the sender's balance has been decreased by 1
      expect(await contract.balanceOf(acc1.address)).to.equal(prev_acc1_balance.valueOf() - BigInt(1))
      //Check if the receiver's balance has been increased by 1
      expect(await contract.balanceOf(acc2.address)).to.equal(prev_acc2_balance.valueOf() + BigInt(1))
      //Check if the token owner has been updated
      expect(await contract.ownerOf(0)).to.equal(acc2.address)
    })
  })
 
});
