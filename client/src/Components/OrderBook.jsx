import React, { useEffect, useState } from 'react';
import { getOrderBook, getMyOrders, getTicker } from '../Utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import commonWallet from '../Utils/commonWallet';
import { ethers } from 'ethers';

const OrderBook = () => {
    const dispatch = useDispatch();

    const {
        contract,
        wallet,
        tradeToken,
        tokenList,
    } = useSelector(state => state.app);

    const SIDE = {
        BUY: 0,
        SELL: 1
    };

    const [buyOrderList, setBuyOrderList] = useState([5, 2, 2, 2, 2]);
    const [sellOrderList, setSellOrderList] = useState([5, 2, 2, 2, 2]);

    const getAllOrdersData = async () => {
        console.log("tokenList", tokenList)
        console.log("token", tradeToken);

        let ticker = getTicker(tokenList, tradeToken)
        console.log("ticker", ticker)
        let data = await contract.getOrders(ticker, SIDE.BUY)
        console.log("data", data);

        const orders = await Promise.all([
            contract.getOrders(
                ticker,
                SIDE.BUY
            ),
            contract.getOrders(
                ticker,
                SIDE.SELL
            ),
        ]);

        console.log("orders: ", orders)
        // let buyList = await getOrderBook(ticker, SIDE.BUY, contract)
        // console.log(buyList)
        // let sellList = await getOrderBook(ticker, SIDE.SELL, contract)
        // console.log(sellList)
    }
    // useEffect(() => {
    // getAllOrdersData()
    // }, [tradeToken]);

    return (
        <div className='bg-slate-300 drop-shadow-lg rounded mt-2'>
            <div className='border-b-2 border-slate-400 flex items-center justify-start'>
                <p className='px-4 py-1'>Order Book</p>
                <button onClick={() => getAllOrdersData()} className='border-2 bg-slate-700 text-slate-300'>GET</button>
            </div>
            <div className='border border-slate-400 divider '>
                <div className='flex justify-evenly  border-b-2 border-slate-400 divide-x-2 divide-slate-400'>
                    <div className='w-1/2 bg-green-400 px-2 py-1 font-bold'>Buy</div>
                    <div className='w-1/2 bg-red-400 px-2 py-1 font-bold'>Sell</div>
                </div>
                <div className='flex justify-evenly divide-x-2 divide-slate-400'>
                    <div className='flex w-1/2 divide-x-2 divide-slate-400'>
                        <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400 font-bold'>Amount</div>
                        <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400 font-bold'>Price</div>
                        <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400 font-bold'>Date</div>
                    </div>
                    <div className='flex w-1/2  divide-x-2 divide-slate-400'>
                        <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400 font-bold'>Amount</div>
                        <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400 font-bold'>Price</div>
                        <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400 font-bold'>Date</div>
                    </div>
                </div>
                <div className='flex justify-evenly  divide-x-2 divide-slate-400'>
                    {
                        buyOrderList.length <= 0 ?
                            <div className='grow text-center p-2 flex'>No Data Available</div>
                            :
                            <div className='flex flex-col w-1/2'>

                                {buyOrderList.map((el, index) => {
                                    return (
                                        <div className='grow flex  divide-x-2 divide-slate-400'>
                                            <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400'>200</div>
                                            <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400'>30000</div>
                                            <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400'>Date</div>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                    {
                        sellOrderList.length <= 0 ?
                            <div className='grow text-center p-2 flex'>No Data Available</div>
                            :
                            <div className='flex flex-col w-1/2'>

                                {sellOrderList.map((el, index) => {
                                    return (
                                        <div className='grow flex  divide-x-2 divide-slate-400'>
                                            <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400'>200</div>
                                            <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400'>30000</div>
                                            <div className='w-1/3 px-2 py-1 border-b-2 border-slate-400'>Date</div>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export { OrderBook }