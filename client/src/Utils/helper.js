import { ethers } from "ethers";
import commonWallet from "./commonWallet";

export const getTokenData = async (contractPara, addressPara) => {
    try {
        let list = await commonWallet.getTokens();
        let tokenArray = []

        for (let i = 0; i < list.length; i++) {
            let tokenObj = {}
            let ticker = ethers.utils.parseBytes32String(list[i].ticker)
            let lowerCase = ticker.toLowerCase()
            let tokenName = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
            let balance = await contractPara.traderBalances(addressPara, list[i].ticker)

            tokenObj.name = tokenName;
            tokenObj.ticker = list[i].ticker;
            tokenObj.address = list[i].tokenAddress;
            tokenObj.balance = balance.toString();

            tokenArray.push(tokenObj)
        }

        return tokenArray;
    } catch (error) {
        console.log(error)
    }
}

export const getBalance = (tokenList, token) => {
    for (let i = 0; i < tokenList.length; i++) {
        if (tokenList[i].name === token) {
            return tokenList[i].balance;
        }
    }
}

export const getTicker = (tokenList, token) => {
    for(let i = 0; i < tokenList.length; i++) {
        if(tokenList[i].name === token) {
            return tokenList[i].ticker;
        }
    }
}