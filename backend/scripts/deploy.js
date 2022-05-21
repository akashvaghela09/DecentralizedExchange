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

    const amount = ethers.utils.parseEther('1000');

    const seedTokenBalance = async (token, trader) => {
        await token.faucet(trader.address, amount)

        console.log(await token.balanceOf(trader.address));
        await token.connect(trader).approve(dcx.address, amount);
        const ticker = await token.name();
        console.log(ticker);

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