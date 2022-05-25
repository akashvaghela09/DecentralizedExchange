import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/app/actions"
import commonWallet from "../Utils/commonWallet";
import { ethers } from "ethers";
import { DcxWallet } from '../Components/DcxWallet';
import { Trade } from '../Components/Trade';
import { Orders } from '../Components/Orders';
import { OrderBook } from '../Components/OrderBook';

const Home = () => {
    const dispatch = useDispatch();

    const {
        tradeToken
    } = useSelector(state => state.app)


    const getData = async () => {

        dispatch(setLoading(true))

        try {
            console.log(commonWallet)
            let tokens = await commonWallet.getTokens();
            console.log(tokens);
        } catch (error) {
            console.log(error)
        }
        dispatch(setLoading(false))
        
        // dispatch(setLoading(true))

        // let data = await commonWallet.getFundingData()
        // .then((res) => {
        //     setTotalCauses(res.length)

        //     let totalCompleted = 0;
        //     for (let i = 0; i < res.length; i++) {
        //         let item = res[i]
        //         if (item.isOpen === false) {
        //             totalCompleted++
        //         }
        //     }

        //     setTotalCompleted(totalCompleted)
        //     setTotalOpen(res.length - totalCompleted)
        // })
        // .catch((err) => {
        //     dispatch(setLoading(false))
        //     console.log("err", err)
        // })

        // let totalFund = await commonWallet.getTotalFundRaised()
        // const ethValue = Math.floor(ethers.utils.formatEther(totalFund) * 100) / 100;

        // setTotalRaised(ethValue)
        // dispatch(setLoading(false))
    }

    // useEffect(() => {
    //     getData()
    // }, []);

    return (
        <div className='h-full min-h-screen flex pb-10 bg-slate-500'>
            <div className='basis-1/3 px-2'>
                <DcxWallet />
                <Trade />
            </div>
        <div className='grow px-2'>
            <Orders />
            <OrderBook />
        </div>
        
        </div>
    )
}

export { Home }