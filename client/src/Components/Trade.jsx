import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTradeTxSide, setOrderTxType, setAlert, setLoading, setTokenBalance, setDaiBalance, setTokenList } from '../Redux/app/actions';
import { getTicker, getTokenData, getBalance } from "../Utils/helper";

const Trade = () => {
    const dispatch = useDispatch();

    const {
        contract,
        wallet,
        tradeToken,
        tokenList,
        tradeTxSide,
        orderTxType
    } = useSelector(state => state.app)

    const [txAmount, setTxAmount] = useState("");
    
    const SIDE = {
        BUY: 0,
        SELL: 1
      };

    const handleTradeTxSide = (para) => {
        dispatch(setTradeTxSide(para))
    }

    const handleOrderTxType = (para) => {
        dispatch(setOrderTxType(para))
    }

    const handleTradeTx = async () => {
        dispatch(setLoading(true))
        if(txAmount <= 0){
            dispatch(setAlert({status: true, msg: "Please enter a valid amount"}))
            dispatch(setLoading(false))
            return;
        } 

        let ticker = getTicker(tokenList, tradeToken)
        let crrSide = tradeTxSide === "Buy" ? SIDE.BUY : SIDE.SELL;
        
        if(orderTxType === "Market"){
            console.log(ticker)
            console.log(crrSide)
            console.log(txAmount)
            console.log(orderTxType)
            let tx = await contract.createMarketOrder(ticker, txAmount, crrSide)
            await tx.wait()
            getLatestBalance()

        } else if (orderTxType === "Limit") {
            console.log(ticker)
            console.log(crrSide)
            console.log(txAmount)
            console.log(orderTxType)
            let tx = await contract.createLimitOrder(ticker, txAmount, crrSide)
            await tx.wait()
            getLatestBalance()
        }

        setTxAmount("");
        dispatch(setLoading(false))
    }

    const getLatestBalance = async () => {
        let list = await getTokenData(contract, wallet.accounts[0])
        dispatch(setTokenList(list))
        let dai = getBalance(list, "Dai")
        dispatch(setDaiBalance(dai))
        let bat = getBalance(list, tradeToken)
        dispatch(setTokenBalance(bat))
    }

    return (
        <div className='h-fit bg-slate-300 rounded drop-shadow-lg mt-2'>
            <div className='flex'>
                <div onClick={() => handleTradeTxSide("Buy")} className={tradeTxSide === "Buy" ? "grow text-center p-2 bg-slate-300 rounded-l select-none cursor-pointer" : "grow text-center p-2 bg-slate-400 rounded-l select-none cursor-pointer"}>
                    Buy
                </div>
                <div onClick={() => handleTradeTxSide("Sell")} className={tradeTxSide === "Sell" ? "grow text-center p-2 bg-slate-300 rounded-r select-none cursor-pointer" : "grow text-center p-2 bg-slate-400 rounded-r select-none cursor-pointer"}>
                    Sell
                </div>
            </div>
            <div className='flex flex-col p-2'>
                <div className='flex items-center'>
                    <p className='grow mx-2'>Amount</p>
                    <label className='flex grow items-center justify-end'>
                        <p onClick={() => handleOrderTxType("Market")} className={orderTxType === "Market" ? "my-1 mx-2 font-bold cursor-pointer" : "my-1 mx-2 text-slate-600 cursor-pointer"}>Market</p> |
                        <p onClick={() => handleOrderTxType("Limit")} className={orderTxType === "Limit" ? "my-1 mx-2 font-bold cursor-pointer" : "my-1 mx-2 text-slate-600 cursor-pointer"}>Limit</p>
                    </label>
                </div>
                <div className='bg-slate-400 flex m-2 px-2 rounded'>
                    <input value={txAmount} onChange={(e) => setTxAmount(e.target.value)}  placeholder='0.00' className='bg-slate-400 placeholder:text-gray-700 outline-none w-full' />
                    <p className='p-2 '>{tradeToken}</p>
                </div>
            </div>
            <div className='p-4'>
                <p className='py-1'>Order Details</p>
                <label className='border-y-2 border-slate-400 border-dotted flex justify-between py-1'>
                    <p className=''>Fee</p>
                    <p className=''>0.00</p>
                </label>
                <label className='flex justify-between py-1'>
                    <p className=''>Cost</p>
                    <p className=''>0.00</p>
                </label>
                <button onClick={() => handleTradeTx()} className={tradeTxSide === "Buy" ? "bg-green-700 text-white w-full p-3 mt-2 rounded active:translate-y-1" : "bg-red-700 text-white w-full p-3 mt-2 rounded active:translate-y-1"}>{tradeTxSide} {tradeToken}</button>
            </div>
        </div>
    )
}

export { Trade }