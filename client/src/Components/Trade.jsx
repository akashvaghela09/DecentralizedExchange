import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTradeTxSide, setOrderTxType, setAlert } from '../Redux/app/actions';

const Trade = () => {
    const dispatch = useDispatch();

    const {
        contract,
        tradeToken,
        tradeTxSide,
        orderTxType
    } = useSelector(state => state.app)

    const [txAmount, setTxAmount] = useState("");

    const handleTradeTxSide = (para) => {
        dispatch(setTradeTxSide(para))
    }

    const handleOrderTxType = (para) => {
        dispatch(setOrderTxType(para))
    }

    const handleTradeTx = () => {
        if(txAmount <= 0){
            dispatch(setAlert({status: true, msg: "Please enter a valid amount"}))
            return;
        } 
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