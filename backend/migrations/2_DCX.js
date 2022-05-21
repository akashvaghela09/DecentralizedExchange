const { ethers } = require("ethers");

const DCX = artifacts.require("DCX");
const Bat = artifacts.require("Bat");
const Dai = artifacts.require("Dai");
const Rep = artifacts.require("Rep");
const Zrx = artifacts.require("Zrx");

module.exports = async function (deployer, _network, accounts) {

  const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX'].map((ticker) => ethers.utils.formatBytes32String(ticker));

    const SIDE = {
        BUY: 0,
        SELL: 1
    }

    const [trader1, trader2, trader3, trader4, trader5] = accounts;
  
  console.log("Account address 1 : ", trader1);
  console.log("Account address 2 : ", trader2);
  console.log("Account address 3 : ", trader3);
  console.log("Account address 4 : ", trader4);
  console.log("Account address 5 : ", trader5);

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
    
    console.log("DCX Address", DCX.address);
    console.log("Bat Address", Bat.address);
    console.log("Dai Address", Dai.address);
    console.log("Rep Address", Rep.address);
    console.log("Zrx Address", Zrx.address);

    // console.log("DCX", DCX);
    // console.log("dcx", dcx);
  
  await Promise.all([
    dcx.addToken(DAI, Dai.address),
    dcx.addToken(BAT, Bat.address),
    dcx.addToken(REP, Rep.address),
    dcx.addToken(ZRX, Zrx.address)
])

const amount = ethers.utils.parseEther('1000');

//     await dai.faucet(trader1, amount)
//     // let bal = 
//   const bal = await dai.balanceOf(trader1);
// console.log(bal.toString());
    const seedTokenBalance = async (token, trader) => {
        // console.log("token : ", token);
        // console.log("trader : ", trader);



        await token.faucet(trader, amount)

        // console.log(await token.balanceOf(trader));
        await token.approve(dcx.address, amount , { from : trader});
        const ticker = await token.name();
        console.log(ticker);

        await dcx.deposite(amount, ethers.utils.formatBytes32String(ticker), { from : trader});
    }

    await Promise.all(
        [dai, bat, rep, zrx].map((token) => seedTokenBalance(token, trader1))
    )

    await Promise.all(
        [dai, bat, rep, zrx].map((token) => seedTokenBalance(token, trader2))
    )

    await Promise.all(
        [dai, bat, rep, zrx].map((token) => seedTokenBalance(token, trader3))
    )

    await Promise.all(
        [dai, bat, rep, zrx].map((token) => seedTokenBalance(token, trader4))
    )
};
