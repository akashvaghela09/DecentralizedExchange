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

    return (
        <div className='h-full min-h-screen flex flex-col md:flex-row  pb-10 bg-slate-500'>
            <div className='basis-1/3 px-2 flex flex-col'>
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