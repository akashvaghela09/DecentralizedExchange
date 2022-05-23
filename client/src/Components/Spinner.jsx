import React, { useState } from 'react';
// import { ImSpinner2 , ImSpinner8 } from 'react-icons/im';
import { CgSpinner } from 'react-icons/cg';

const Spinner = () => {
    const [status, setStatus] = useState(false);

    return (
        <div>
            <div className='fixed top-0 px-2 left-0 bg-slate-900/50 w-screen h-screen' onClick={() => setStatus(!status)} ></div>
                <div className='flex flex-col items-center justify-center fixed top-1/2 left-1/2 h-fit py-8 w-3/4 md:w-1/3 border-none rounded-md translate-x-[-50%] translate-y-[-50%]'>
                    {/* <ImSpinner2 className='fill-slate-200 text-6xl animate-spin'/> */}
                    {/* <ImSpinner8 className='fill-slate-200 text-6xl animate-spin'/> */}
                    <CgSpinner className='text-slate-300 text-7xl animate-spin'/>
                </div>
        </div>
    )
}

export { Spinner }