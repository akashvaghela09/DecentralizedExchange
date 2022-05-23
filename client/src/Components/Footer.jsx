import React from 'react';

const Footer = () => {
    return (
        <div className='bg-slate-700 flex p-8 border-t-2 border-slate-600 flex-col md:flex-row pb-24 md:p-8'>
            <div className='md:pl-4 flex h-fit items-center w-fit cursor-pointer'>
                <img src='logo.png' alt="dapp logo" className='w-8 h-8 mr-3 md:m-3' />
                <p className="h-fit text-2xl text-slate-200 cursor-pointer font-medium">Crowdy</p>
            </div>
            <div className='flex items-center my-2 md:p-4 md:mx-4 md:my-0'>
                <p className='text-slate-300 font-thin text-md ml-2'>© 2022 DCX — <a href='https://linkedin.com/in/akashvaghela09' rel="noreferrer" target="_blank">@akashvaghela09</a></p>
            </div>
        </div>
    )
}

export { Footer }