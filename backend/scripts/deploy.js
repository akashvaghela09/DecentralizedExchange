const { ethers } = require("hardhat");

async function main() {

    const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX'].map((ticker) => ethers.utils.formatBytes32String(ticker));

    const SIDE = {
        BUY: 0,
        SELL: 1
    }

    const [ trader1, trader2, trader3, trader4, _] = await ethers.getSigners();

    const DCX = await ethers.getContractFactory("DCX");
    const Bat = await ethers.getContractFactory("Bat");
    const Dai = await ethers.getContractFactory("Dai");
    const Rep = await ethers.getContractFactory("Rep");
    const Zrx = await ethers.getContractFactory("Zrx");

    // Create new instance
    const dcx = await DCX.deploy();
    const bat = await Bat.deploy();
    const dai = await Dai.deploy();
    const rep = await Rep.deploy();
    const zrx = await Zrx.deploy();

    await dcx.deployed();
    await bat.deployed();
    await dai.deployed();
    await rep.deployed();
    await zrx.deployed();

    await Promise.all([
        dcx.addToken(DAI, dai.address),
        dcx.addToken(BAT, bat.address),
        dcx.addToken(REP, rep.address),
        dcx.addToken(ZRX, zrx.address)
    ])

    console.log("tokens added");

    const amount = ethers.utils.parseEther('1000');

    const seedTokenBalance = async (token, trader) => {
        await token.faucet(trader.address, amount)
        await token.connect(trader).approve(dcx.address, amount);
        const ticker = await token.name();
        await dcx
            .connect(trader)
            .deposit(amount, hre.ethers.utils.formatBytes32String(ticker));
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

    console.log("tokens seeded");

    const increaseTime = async (seconds) => {
        await ethers.provider.send("evm_increaseTime", [seconds]);
        await ethers.provider.send("evm_mine");
      };
    
      await dcx.connect(trader1).createLimitOrder(BAT, 1000, 10, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(BAT, 1000, SIDE.SELL);
      await increaseTime(1);
      await dcx.connect(trader1).createLimitOrder(BAT, 1200, 11, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(BAT, 1200, SIDE.SELL);
      await increaseTime(1);
      await dcx.connect(trader1).createLimitOrder(BAT, 1200, 15, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(BAT, 1200, SIDE.SELL);
      await increaseTime(1);
      await dcx.connect(trader1).createLimitOrder(BAT, 1500, 14, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(BAT, 1500, SIDE.SELL);
      await increaseTime(1);
      await dcx.connect(trader1).createLimitOrder(BAT, 2000, 12, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(BAT, 2000, SIDE.SELL);
    
      await dcx.connect(trader1).createLimitOrder(REP, 1000, 2, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(REP, 1000, SIDE.SELL);
      await increaseTime(1);
      await dcx.connect(trader1).createLimitOrder(REP, 500, 4, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(REP, 500, SIDE.SELL);
      await increaseTime(1);
      await dcx.connect(trader1).createLimitOrder(REP, 800, 2, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(REP, 800, SIDE.SELL);
      await increaseTime(1);
      await dcx.connect(trader1).createLimitOrder(REP, 1200, 6, SIDE.BUY);
      await dcx.connect(trader2).createMarketOrder(REP, 1200, SIDE.SELL);
    
      console.log("Trade Added");
    
      // create orders
      await Promise.all([
        dcx.connect(trader1).createLimitOrder(BAT, 1400, 10, SIDE.BUY),
        dcx.connect(trader2).createLimitOrder(BAT, 1200, 11, SIDE.BUY),
        dcx.connect(trader2).createLimitOrder(BAT, 1000, 12, SIDE.BUY),
        dcx.connect(trader1).createLimitOrder(REP, 3000, 4, SIDE.BUY),
        dcx.connect(trader1).createLimitOrder(REP, 2000, 5, SIDE.BUY),
        dcx.connect(trader2).createLimitOrder(REP, 500, 6, SIDE.BUY),
        dcx.connect(trader1).createLimitOrder(ZRX, 4000, 12, SIDE.BUY),
        dcx.connect(trader1).createLimitOrder(ZRX, 3000, 13, SIDE.BUY),
        dcx.connect(trader2).createLimitOrder(ZRX, 500, 14, SIDE.BUY),
        dcx.connect(trader3).createLimitOrder(BAT, 2000, 16, SIDE.SELL),
        dcx.connect(trader4).createLimitOrder(BAT, 3000, 15, SIDE.SELL),
        dcx.connect(trader4).createLimitOrder(BAT, 500, 14, SIDE.SELL),
        dcx.connect(trader3).createLimitOrder(REP, 4000, 10, SIDE.SELL),
        dcx.connect(trader3).createLimitOrder(REP, 2000, 9, SIDE.SELL),
        dcx.connect(trader4).createLimitOrder(REP, 800, 8, SIDE.SELL),
        dcx.connect(trader3).createLimitOrder(ZRX, 1500, 23, SIDE.SELL),
        dcx.connect(trader3).createLimitOrder(ZRX, 1200, 22, SIDE.SELL),
        dcx.connect(trader4).createLimitOrder(ZRX, 900, 21, SIDE.SELL),
      ]);
    
      console.log("Order Added");
    
      const orders = await dcx.connect(trader1).getOrders(BAT, SIDE.BUY);
      const sellOrders = await dcx.connect(trader1).getOrders(BAT, SIDE.SELL);
    //   console.log(orders, sellOrders);

    console.log("Success, Dcx Deployed: ", dcx.address);
    console.log("Success, Bat Deployed: ", bat.address);
    console.log("Success, Dai Deployed: ", dai.address);
    console.log("Success, Rep Deployed: ", rep.address);
    console.log("Success, Zrx Deployed: ", zrx.address);
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })