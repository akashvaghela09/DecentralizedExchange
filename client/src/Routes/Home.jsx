import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/app/actions"
import commonWallet from "../Utils/commonWallet";
import { ethers } from "ethers";

const Home = () => {
    const dispatch = useDispatch();

    const {
        contract
      } = useSelector(state => state.app)


    const getData = async () => {
        
        // setInterval(async () => {
        //     console.log(await contract);
        // }, 3000);
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

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className='h-full min-h-screen flex items-center flex-col'>
                    <h1 className='w-fit text-4xl md:text-7xl font-bold text-slate-800  bg-slate-200'>Home</h1>
        </div>
    )
}

export { Home }