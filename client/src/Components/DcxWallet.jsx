import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setWalletTxType } from '../Redux/app/actions';
const DcxWallet = () => {
    const dispatch = useDispatch();

    const {
        tradeToken, 
        walletTxType
    } = useSelector(state => state.app)

    const handleSelectSide = (para) => {
        dispatch(setWalletTxType(para))
    }
    return (
        <div className='bg-slate-300 drop-shadow-lg h-fit w-full mt-2 rounded'>
            <div className='border-b-2 border-slate-400 flex items-center justify-between'>
                <p className='px-4 py-1'>Wallet Balance</p>
                <label className='flex items-center px-4 py-1'>
                    <div className='bg-green-700 h-2 w-2 rounded-full mx-2' />
                    <p>MetaMask</p>
                </label>
            </div>
            <div className='p-3 flex flex-col gap-2 border-b-2 border-slate-400'>
                <div className='flex justify-between'>
                    <p className=''>{tradeToken}</p>
                    <p className='font-bold'>0.00</p>
                </div>
                <div className='flex justify-between'>
                    <p className=''>Dai</p>
                    <p className='font-bold'>0.00</p>
                </div>
            </div>
            <div className='flex flex-col'>

                <div className='flex'>
                    <div onClick={() => handleSelectSide("Deposit")} className={walletTxType === "Deposit" ? "grow text-center p-2 bg-slate-300 rounded-l select-none cursor-pointer" : "grow text-center p-2 bg-slate-400 rounded-l select-none cursor-pointer"}>
                        Deposit
                    </div>
                    <div onClick={() => handleSelectSide("Withdraw")} className={walletTxType === "Withdraw" ? "grow text-center p-2 bg-slate-300 rounded-r select-none cursor-pointer" : "grow text-center p-2 bg-slate-400 rounded-r select-none cursor-pointer"}>
                        Withdraw
                    </div>
                </div>
                <div className='flex flex-col p-4'>
                    <div className='bg-slate-400 flex px-2 rounded'>
                        <input placeholder='0.00' className='bg-slate-400 placeholder:text-gray-700 outline-none w-full' />
                        <p className='p-2 '>{tradeToken}</p>
                    </div>
                    <button className={walletTxType === "Deposit" ? "bg-green-700 text-white w-full p-3 mt-2 rounded active:translate-y-1" : "bg-red-700 text-white w-full p-3 mt-2 rounded active:translate-y-1"}>{walletTxType} {tradeToken}</button>
                </div>

            </div>
        </div>
    )
}

export { DcxWallet }