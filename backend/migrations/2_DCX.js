const Test = artifacts.require("Test");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(Test);
  const wallet = await Test.deployed()
};
