'use client'

import React, { useState, useEffect } from 'react'
import { BsFillArrowThroughHeartFill } from "react-icons/bs"
import Swal from 'sweetalert2'
import HistoryComponent from './components/History'


export default function HalamanIndex() {
  const [data, setData] = useState({
    'nama1':"",
    'nama2':"",
    'hasil':0,
    'history':null,
    'open':false
  })

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("list"))

    if(!getData){
      localStorage.setItem("list", JSON.stringify({data:[]}))
    }else{
      setData({...data, history:getData})
    }

  }, [])


  const calculateCompatibility = (e) => {
    e.preventDefault()
    

    if(data.nama1 == "" || data.nama2 == ""){
      return Swal.fire({
        icon:"error",
        title:"Belum masukin namanya",
        text:"Masukin dulu namanya lah masa pacaran ama setan"
      })
    }

    // Menghitung kompatibilitas berdasarkan panjang nama
    const compatibility = Math.ceil(Math.min(data.nama1.length, data.nama2.length) / Math.max(data.nama1.length, data.nama2.length) * 100)

    let text = null

    if(compatibility > 90){
      text = "Awwww sepertinya kalian berjodoh"
    }else if(compatibility > 70){
      text = "Boleh lah, tapi jaga jaga aja nyari simpenan"
    }else{
      text = "Ga jodoh putusin aja cokkk.."
    }

    Swal.fire({
      title: `${compatibility}%`,
      text: `${text}`,
      imageUrl: "/images/gambartaki.png",
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Custom image"
    });

    let obj = data
    obj.hasil = compatibility

    
    const getData = JSON.parse(localStorage.getItem("list"))
    getData.data.push(obj)
    localStorage.setItem("list", JSON.stringify(getData))
  }



  if(data.history){
    return (
      <div className='h-full w-full min-h-screen'>
        <HistoryComponent dataList={data.history} setData={(value) => setData({...data, open:value})} open={data.open} />
        <div className='flex items-center justify-center h-screen w-full'>
          <div className='bg-white rounded-2xl shadow-md p-10 block'>
            <h1 className='text-center text-pink-500 font-bold text-5xl uppercase'>Prediksi Jodoh</h1>
            <p className='text-center text-sm font-light mb-20'>Cek pacar lu jodoh lu atau bukan disini, kalau bukan putusin aja cuy</p>
            <form onSubmit={(e) => calculateCompatibility(e)} className='block'>
              <div className='flex items-center justify-center gap-10'>
                <input type="text" value={data.nama1} onChange={(e) => setData({...data, nama1:e.target.value})} placeholder='Nama lu' className='font-bold capitalize placeholder:text-zinc-500 py-2 px-5 rounded-md hover:border-blue-400 border-2 border-green-500 focus:border-yellow-500 transition-colors duration-300 ease-in-out' />
                <BsFillArrowThroughHeartFill className="text-pink-500 text-[200px]"/>
                <input type="text" value={data.nama2} onChange={(e) => setData({...data, nama2:e.target.value})} placeholder='Nama pacar lu' className='font-bold capitalize placeholder:text-zinc-500 py-2 px-5 rounded-md hover:border-blue-400 border-2 border-green-500 focus:border-yellow-500 transition-colors duration-300 ease-in-out' />
              </div>
              <div className='mx-auto text-center mt-10'>
                <button type='submit' className='animate-bounce mx-auto text-center bg-pink-100 rounded-md shadow-md py-2 px-5 text-pink-500 font-bold uppercase mr-4'>
                  Coba Cek
                </button>
                <button type='button' onClick={() => setData({...data, open:true})} className='animate-bounce mx-auto text-center bg-blue-100 rounded-md shadow-md py-2 px-5 text-blue-500 font-bold uppercase'>
                  Mau liat history
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
