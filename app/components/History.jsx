'use client'

import React from 'react'

export default function HistoryComponent({ dataList, setData, open }) {
  return (
    <div className={`z-20 fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40 flex items-center justify-center ${open ? "opacity-100 visible":"invisible opacity-0"} transition-all duration-300 ease-in-out`}>
        <div className='bg-white rounded-md w-1/2 p-10 relative'>
            <button onClick={() => setData(false)} className='absolute top-5 right-5'>
                X
            </button>
            <h1 className='font-bold text-pink-500 mb-5'>History Lu</h1>
            {
                dataList ?
                dataList.data.length > 0 ?
                dataList.data.map((item, key) => {
                    return (
                        <div key={key} className=''>
                            {item.nama1} X {item.nama2} = {item.hasil}%
                        </div>
                    )
                })
                :
                <h1 className='text-red-500 text-sm mt-2'>Belum ada history</h1>
                :"Loading"
            }
        </div>
    </div>
  )
}
