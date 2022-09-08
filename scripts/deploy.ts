const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("deploying dummy contract with address ",deployer.address);
  const dummyContract = await hre.ethers.getContractFactory("dummy");
  const dummy = await dummyContract.deploy();

  await dummy.deployed();
  console.log("dummy contract deployed to : ", dummy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    process.exit(1);
  });
//deploying account is the old one used to deploy e pvc
//0x608f59c2540bb0f8fd80030ea36d2d7da1cb5f5338d76fc3484021ced278b4c1
//deploying dummy contract with address  0x2431C1cDe9abBfDC0E7e68A40CFE8269cbb98AC8
//dummy contract deployed to :  0x15D9d79417f7ab70c8b09B63BD7BE3414ba8F2B4

//address : 0x06Ad80fEEd4E631aDf6e87485f00A405a2dF5EB9
//private key: 0xd92c078bebf9d0d96481deac6452fc17f9caaab2f526c6ef20568034761d979d

//address : 0xbbce36DD69E274e5e3fC68BfBf13d6797da34EDE 
//private key: 0x2767d5918481c903fd7e88bd7f028f388eda26d36d034ec4226e8fb637de99ea