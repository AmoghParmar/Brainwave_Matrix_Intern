// const { error } = require("console");
// const hre = require("hardhat");

// async function main(){
//   // const currentTimestampInSeconds = Math.round(Date.now()/1000);
//   // const ONE_YEAR_IN_SECS = 365*24*60*60;
//   // const unlockTime=currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   // const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock =await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy();

//   await lock.deployed();

//   console.log("Lock with 1 ETH deployed to : ", lock.addess);
// }

// // We recommend this patter to be able to use async/await everywhere
// // and properly handle ERRORS.

// main().catch((error)=>{
//   console.error(error);
//   process.exitCode = 1;
// }); 







const hre = require("hardhat");

async function main(){
  const Create = await hre.ethers.getContractFactory("Create");
  const create = await Create.deploy();

  await create.deployed();

  console.log("Lock with 1 ETH deployed to:" , create.address);

}
main().catch((error)=>{
  console.error(error);
  process.exitCode = 1;
});






 