import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BsInfoSquare } from 'react-icons/bs';
import { setAlert } from "../Redux/app/actions";

const Alert = () => {
    const dispatch = useDispatch();
  
    const { isAlert } = useSelector((state) => state.app)
    const handleAlert = () => {
        let alertObj = {status: false, msg: ""};
        dispatch(setAlert(alertObj))
    }

    return (
        <div>
            <div className='fixed top-0 px-2 left-0 bg-slate-900/50 w-screen h-screen'></div>
                <div className='flex flex-col items-center justify-center fixed top-1/2 left-1/2 h-fit py-8 w-3/4 md:w-1/3 border-none bg-slate-700 shadow-lg rounded-md translate-x-[-50%] translate-y-[-50%]'>
                    <BsInfoSquare className='fill-slate-300 text-6xl'/>
                    <p className='text-xl text-slate-300 m-8 text-center'>{isAlert.msg}</p>
                    <button onClick={handleAlert} className='active:translate-y-1 bg-blue-500 text-neutral-100 rounded-md w-4/5 py-2 m-2 text-xl'>OK</button>
                </div>
        </div>
    )
}

export { Alert }