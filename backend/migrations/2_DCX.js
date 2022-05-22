const { ethers } = require("ethers");

const DCX = artifacts.require("DCX");
const Bat = artifacts.require("Bat");
const Dai = artifacts.require("Dai");
const Rep = artifacts.require("Rep");
const Zrx = artifacts.require("Zrx");

module.exports = async function (deployer, _network, accounts) {

    await deployer.deploy(DCX);
    await deployer.deploy(Bat);
    await deployer.deploy(Dai);
    await deployer.deploy(Rep);
    await deployer.deploy(Zrx);

    const dcx = await DCX.deployed()
    const bat = await Bat.deployed()
    const dai = await Dai.deployed()
    const rep = await Rep.deployed()
    const zrx = await Zrx.deployed()
};
