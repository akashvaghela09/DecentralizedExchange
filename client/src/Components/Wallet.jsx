import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import { FaUserCircle, FaEthereum } from 'react-icons/fa';
import { Fade } from "react-awesome-reveal";
import { IoWalletOutline } from 'react-icons/io5';
import { GoLinkExternal } from 'react-icons/go';
import { SiHiveBlockchain } from 'react-icons/si';
import { FiLogOut } from 'react-icons/fi';
import { setContractInstance, setIsAuth, setLoading, setWallet, setWalletModal, setTokenList, setTokenBalance, setDaiBalance } from "../Redux/app/actions"
import { ethers } from "ethers";
import myContractData from "../artifacts/contracts/DCX.sol/DCX.json";
import { metamask, metaMaskChecker } from '../Utils/metamaskChecker';
import { toast } from 'react-toastify';
import commonWallet from '../Utils/commonWallet';
import { getTokenData, getBalance } from '../Utils/helper';

const Wallet = () => {
    const dispatch = useDispatch();
    // const location = useLocation();

    const [profileModal, setProfileModal] = useState(false);
    const [guestWalletLoading, setGuestWalletLoading] = useState(false)
    const [userWalletLoading, setUserWalletLoading] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState(false)

    const abi = myContractData.abi;
    const contract_address = process.env.REACT_APP_DCX_CONTRACT_ADDRESS;

    const {
        isAuth,
        wallet,
        walletModal,
        tradeToken
    } = useSelector(state => state.app)

    const checkAuthStatus = () => {
        if (isAuth === true) {
            setProfileModal(!profileModal)
        } else {
            dispatch(setWalletModal(true))
        }
    }

    const handleWalletUser = async (para) => {
        if (para === "user") {
            setUserWalletLoading(true);
            setTimeout(async () => {
                setUserWalletLoading(false);
                let response = await metaMaskChecker();

                if (response.status === true) {
                    connectWallet(para)
                } else {
                    dispatch(setWalletModal(false))
                    toast.error(response.msg, { autoClose: false })
                }
            }, 1500);
        } else if (para === "guest") {
            setGuestWalletLoading(true);
            setTimeout(() => {
                setGuestWalletLoading(false);
                connectWallet(para)
            }, 2500);
        }
    }

    const connectWallet = async (para) => {
        dispatch(setWalletModal(false))
        dispatch(setLoading(true));

        if (para === "user") {
            let walletObj = { "name": "MetaMask" }
            walletObj.accounts = await metamask.requestAccounts()
            walletObj.balance = await metamask.getBalance()
            walletObj.network = await metamask.chainId()
            walletObj.isConnected = await metamask.isConnected()
            dispatch(setWallet(walletObj));
            dispatch(setIsAuth(true))

            const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
            let mySigner = ethersProvider.getSigner();

            let contractObj = new ethers.Contract(
                contract_address,
                abi,
                mySigner
            );

            dispatch(setContractInstance(contractObj))
            let list = await getTokenData(contractObj, walletObj.accounts[0])
            dispatch(setTokenList(list))
            let dai = getBalance(list, "Dai")
            dispatch(setDaiBalance(dai))
            let bat = getBalance(list, tradeToken)
            dispatch(setTokenBalance(bat))

        } else if (para === "guest") {
            dispatch(setWallet({ "name": "MetaMask", "accounts": ['0x51E821EE92486EfbaE1A63b2da3f75546084c6B8'], "balance": "0.0000000000000", "network": "0x4", "isConnected": true }));
            dispatch(setIsAuth(true))

            const ethersProvider = ethers.getDefaultProvider(process.env.REACT_APP_RINKEBY_URL);
            const guestWallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, ethersProvider);
            let mySigner = guestWallet.connect(ethersProvider)

            let contractObj = new ethers.Contract(
                contract_address,
                abi,
                mySigner
            );

            dispatch(setContractInstance(contractObj))
            let list = await getTokenData(contractObj, "0x51E821EE92486EfbaE1A63b2da3f75546084c6B8")
            dispatch(setTokenList(list))
            let dai = getBalance(list, "Dai")
            dispatch(setDaiBalance(dai))
            let bat = getBalance(list, tradeToken)
            dispatch(setTokenBalance(bat))
        }

        dispatch(setLoading(false));
    }

    const handleLogOut = () => {
        setLogoutLoading(true);
        setTimeout(() => {
            setLogoutLoading(false);
            setProfileModal(!profileModal)
            dispatch(setIsAuth(false))
            dispatch(setWalletModal(false))
            dispatch(setWallet({}))
            dispatch(setContractInstance({}))
            dispatch(setTokenBalance("0.00"))
            dispatch(setDaiBalance("0.00"))
        }, 1500);
    }

    const networkObj = {
        "0x1": "MainNet",
        "0x3": "Ropsten",
        "0x4": "Rinkeby",
        "0x42": "Kovan"
    }

    const concatString = (para = "") => {
        let adr = para.split("")
        let start = adr.slice(0, 4).join("")
        let end = adr.slice(-4).join("")
        let string = `${start}...${end}`
        return string;
    }

    return (
        <>
            <div className='px-2 py-1 mx-2 hover:bg-blue-500 rounded-md ' >
                <MdOutlineAccountBalanceWallet className='fill-slate-300 text-4xl cursor-pointer transition ease-in' onClick={() => checkAuthStatus()} />
                {
                    isAuth === true ?
                        <div className='border-2 border-slate-200 rounded-full w-3 h-3 bg-green-500 absolute bottom-3 right-3 md:right-7' />
                        :
                        <div className='border-2 border-slate-200 rounded-full w-3 h-3 bg-slate-500 absolute bottom-3 right-3 md:right-7' />
                }
            </div>

            {
                walletModal === true &&
                <div>
                    <div className='fixed top-0 px-2 left-0 bg-gray-900/30 backdrop-blur-sm w-screen h-screen' onClick={() => dispatch(setWalletModal(false))} ></div>
                    <Fade>
                        <div className='flex flex-col items-center justify-center fixed top-1/2 left-1/2 h-fit py-8 w-3/4 md:w-1/3 border-none bg-slate-300 shadow-lg rounded-md translate-x-[-50%] translate-y-[-50%]'>
                            {
                                userWalletLoading === false ?
                                    <button onClick={() => handleWalletUser("user")} className='active:translate-y-1 bg-blue-500 text-neutral-100 rounded-md w-4/5 py-2 m-2 text-xl hover:bg-blue-600'>Connect your Wallet</button>
                                    :
                                    <button className='flex justify-center items-center active:translate-y-1 bg-blue-600 text-neutral-100 rounded-md w-4/5 py-2 m-2 text-xl '> <AiOutlineLoading3Quarters className='mx-4 text-2xl animate-spin' /> Connecting ...</button>

                            }
                            <div className="p-4 flex w-4/5 justify-center items-center">
                                <div className='bg-slate-500 h-[2px] flex grow' />
                                <p className='m-2 text-slate-700'>OR</p>
                                <div className='bg-slate-500 h-[2px] flex grow' />
                            </div>
                            {
                                guestWalletLoading === false ?
                                    <button onClick={() => handleWalletUser("guest")} className='active:translate-y-1 bg-blue-500 text-neutral-100 rounded-md w-4/5 py-2 m-2 text-xl hover:bg-blue-600'>Continue as a guest</button>
                                    :
                                    <button className='flex justify-center items-center active:translate-y-1 bg-blue-600 text-neutral-100 rounded-md w-4/5 py-2 m-2 text-xl'> <AiOutlineLoading3Quarters className='mx-4 text-2xl animate-spin' /> Processing ...</button>

                            }

                        </div>
                    </Fade>
                </div>
            }

            {
                profileModal === true &&                                                                                // -4px 5px 12px 0px rgba(5,8,15,0.77) [-4px_5px_12px_rgba(5,8,15,0.77)]
                <div className='absolute top-[65px] right-2  w-fit h-fit flex flex-col items-center rounded bg-slate-300 py-2 drop-shadow-[-2px_3px_5px_rgba(5,8,15,0.77)]'>
                    <FaUserCircle className='text-6xl text-slate-800 my-4' />
                    <div className='flex items-center p-2 px-4'>
                        <p className='text-slate-800 m-1'>ETH : {concatString(wallet.accounts[0])}</p>
                        <BiCopy onClick={() => navigator.clipboard.writeText(wallet.accounts[0])} className="m-1 text-xl fill-slate-800 active:translate-y-1 cursor-pointer" />
                        <GoLinkExternal onClick={() => window.open(`https://rinkeby.etherscan.io/address/${wallet.accounts[0]}`, '_blank')} className="m-1 text-xl fill-slate-800 active:translate-y-1 cursor-pointer" />
                    </div>
                    <div className='flex items-center border-[1px] border-slate-400 w-full'>
                        <FaEthereum className="fill-slate-800 m-1 text-xl" />
                        <div className="flex grow justify-between">
                            <p className="text-slate-800 px-2">Balance</p>
                            <p className="text-slate-800 px-2">{concatString(wallet.balance)}</p>
                        </div>
                    </div>
                    <div className='flex items-center border-[1px] border-slate-400 w-full'>
                        <IoWalletOutline className="text-slate-800 m-1 text-xl" />
                        <div className="flex grow justify-between">
                            <p className="text-slate-800 px-2">Wallet</p>
                            <p className="text-slate-800 px-2">{wallet.name}</p>
                        </div>
                    </div>
                    <div className='flex items-center border-[1px] border-slate-400 w-full'>
                        <SiHiveBlockchain className="fill-slate-800 m-1 text-xl" />
                        <div className="flex grow justify-between">
                            <p className="text-slate-800 px-2">Network</p>
                            <p className="text-slate-800 px-2">{networkObj[wallet.network]}</p>
                        </div>
                    </div>
                    {
                        logoutLoading === false ?
                            <button onClick={() => handleLogOut()} className='flex justify-center items-center active:translate-y-1 bg-blue-500 text-neutral-100 rounded-md w-4/5 py-2 m-2 text-xl'> Log Out <FiLogOut className='mx-2 text-2xl' /></button>
                            :
                            <button className='flex justify-center items-center active:translate-y-1 bg-blue-500 text-neutral-100 rounded-md w-4/5 py-2 m-2 text-xl'> Log Out <AiOutlineLoading3Quarters className='mx-2 text-2xl animate-spin' /></button>
                    }
                </div>
            }
        </>
    )
}

export { Wallet }