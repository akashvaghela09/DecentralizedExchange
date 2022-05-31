import React, { useState } from 'react';
import { Wallet } from './Wallet';
import { AiFillHome } from 'react-icons/ai';
import { FaGithub, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { setDaiBalance, setTokenBalance, setTradeToken } from '../Redux/app/actions';
import { getBalance } from '../Utils/helper';

const Header = () => {
    const dispatch = useDispatch();

    const {
        tradeToken,
        tokenList
    } = useSelector(state => state.app)

    const [selectModal, setSelectModal] = useState(false);

    let navigate = useNavigate();

    const handleRoute = (para) => {
        navigate(`/${para}`)
    }

    const handleSelect = (para) => {
        dispatch(setTradeToken(para))
        let dai = getBalance(tokenList, "Dai")
        dispatch(setDaiBalance(dai))
        let bat = getBalance(tokenList, para)
        dispatch(setTokenBalance(bat))
        setSelectModal(false)
    }

    return (
        <div className='bg-slate-800 h-fit flex sticky top-0 left-0 select-none z-10'>
            <div className='md:py-1 flex h-fit items-center justify-center w-fit'>
                <div onClick={() => handleRoute("")} className='cursor-pointer flex items-center  border-slate-400 px-8 border-r-2'>
                    <img src='logo.png' alt="dapp logo" className='w-8 h-8 m-1' />
                    <p className="h-fit text-2xl text-slate-200 cursor-pointer font-medium">DCX</p>
                </div>
                <div className={selectModal === true ? "mx-4 w-fit border-2 border-slate-700" : "mx-4 w-fit border-2 border-slate-800"}>
                    <div onClick={() => setSelectModal(!selectModal)} className='w-48 px-4 py-1 cursor-pointer flex items-center'>
                        <img className='w-6 h-6 mx-2' src={`./${tradeToken}.png`} alt="bat token" />
                        <p className='text-slate-200 text-xl mx-2'>{tradeToken}/Dai *</p>
                    </div>
                    {
                        selectModal &&
                        <div className='absolute top-11 bg-slate-800 w-48'>
                            <div onClick={() => handleSelect("Bat")} className='flex items-center px-4 border-2 border-slate-700 py-2 cursor-pointer'>
                                <img className='w-6 h-6 mx-2' src="./Bat.png" alt="bat token" />
                                <p className='text-slate-200 text-xl mx-2'>Bat/Dai</p>
                            </div>
                            <div onClick={() => handleSelect("Rep")} className='flex items-center px-4 border-2 border-slate-700 py-2 cursor-pointer'>
                                <img className='w-6 h-6 mx-2' src="./Rep.png" alt="rep token" />
                                <p className='text-slate-200 text-xl mx-2'>Rep/Dai</p>
                            </div>
                            <div onClick={() => handleSelect("Zrx")} className='flex items-center px-4 border-2 border-slate-700 py-2 cursor-pointer'>
                                <img className='w-6 h-6 mx-2' src="./Zrx.png" alt="zrx token" />
                                <p className='text-slate-200 text-xl mx-2'>Zrx/Dai</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='flex grow justify-end items-center  md:pr-4'>
                <div className='hidden md:flex md:border-r-2 border-slate-400'>
                    <p className='cursor-pointer hover:bg-blue-500 px-3 py-2 rounded-md transition ease-in h-fit text-xl text-slate-200 mx-3'><a href='https://github.com/akashvaghela09/DecentralizedExchange' rel="noreferrer" target="_blank">GitHub</a></p>
                    <p className='cursor-pointer hover:bg-blue-500 px-3 py-2 rounded-md transition ease-in h-fit text-xl text-slate-200 mx-3'><a href='https://akashvaghela.dev' rel="noreferrer" target="_blank">About</a></p>
                </div>

                <div className=' flex justify-around fixed bg-slate-800 bottom-0 left-0 w-full h-fit md:hidden'>
                    <div className="flex items-center flex-col m-2">
                        <AiFillHome onClick={() => handleRoute("")} className='fill-slate-100 text-2xl cursor-pointer' />
                        <p className="text-slate-300 text-sm">Home</p>
                    </div>
                    <div className="flex items-center flex-col m-2">
                        <a href='https://github.com/akashvaghela09/DecentralizedExchange' rel="noreferrer" target="_blank">
                            <FaGithub className='fill-slate-100 text-2xl cursor-pointer' />
                        </a>
                        <p className="text-slate-300 text-sm">Github</p>
                    </div>
                    <div className="flex items-center flex-col m-2">
                        <a href='https://akashvaghela.dev' rel="noreferrer" target="_blank">
                            <FaUserCircle className='fill-slate-100 text-2xl cursor-pointer' />
                        </a>
                        <p className="text-slate-300 text-sm">About</p>
                    </div>
                </div>
                <Wallet />
            </div>
        </div>
    )
}

export { Header }