const { ethers } = require("hardhat");

async function main() {
    const Test = await ethers.getContractFactory(
        "Test"   // Contract Name
    );

    // Create new instance
    const newTestContract = await Test.deploy()

    await newTestContract.deployed();
    console.log("Success, Contract Deployed: ", newTestContract.address);
}

main()
.then(() => {
    process.exit(0)
})
.catch((err) => {
    console.error(err);
    process.exit(1);
})