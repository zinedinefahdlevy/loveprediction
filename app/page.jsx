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
    const count1 = Math.ceil(Math.min(data.nama1.length, data.nama2.length) / Math.max(data.nama1.length, data.nama2.length) * 100)

    // perhitungan selanjutnya
    const calculateTotal = (name) => {
      return name
        .split('')
        .map(char => char.charCodeAt(0))
        .reduce((total, charCode) => total + charCode, 0);
    };

    const totalName1 = calculateTotal(data.nama1);
    const totalName2 = calculateTotal(data.nama2);

    // Menghitung persentase berdasarkan total angka dalam nama
    const count2 = ((totalName1 + totalName2) % 100); // Maksimum 100%


    // perhitungan ketiga
    const nameLengthDifference = Math.abs(data.nama1.length - data.nama2.length);

    // Contoh perhitungan berdasarkan kesamaan huruf
    const commonLetters = data.nama1.split('').filter(char => data.nama2.includes(char)).length;

    // Gabungkan beberapa faktor ke dalam perhitungan kompatibilitas
    const count3 = ((commonLetters + nameLengthDifference) / (data.nama1.length + data.nama2.length)) * 100;

    let total = Math.ceil((count1 + count2 + count3) / 3)

    if(data.nama1 == "Zinedine" && data.nama2 == "Dela"){
      total = 100
    }

    let text = null

    if(total > 75){
      text = "Selamat anda berjodoh"
    }else if(total > 55){
      text = "Boleh lah boleh lah"
    }else if(total > 40){
      text = "Hmm... Kemungkinan selingkuh sih"
    }else{
      text = "Ga jodoh putusin aja cokkk.."
    }

    Swal.fire({
      title: `${total}%`,
      text: `${text}`,
      imageUrl: "/images/gambartaki.png",
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Custom image"
    });

    let obj = data
    obj.hasil = total

    
    const getData = JSON.parse(localStorage.getItem("list"))
    getData.data.push(obj)
    localStorage.setItem("list", JSON.stringify(getData))
  }



  return (
    <div className='h-full w-full min-h-screen bg-gradient-to-bl from-pink-500 via-pink-300 to-pink-100'>
      <HistoryComponent dataList={data.history} setData={(value) => setData({...data, open:value})} open={data.open} />
      <div className='md:flex items-center justify-center h-screen w-full'>
        <div className='bg-white rounded-2xl shadow-md p-5 md:p-10 block'>
          <h1 className='text-center text-pink-500 font-bold text-2xl md:text-5xl uppercase'>Prediksi Jodoh</h1>
          <p className='text-center text-xs md:text-sm font-light mb-10 md:mb-20'>Cek apakah kalian berjodoh?</p>
          <form onSubmit={(e) => calculateCompatibility(e)} className='block'>
            <div className='md:flex items-center justify-center space-y-8 md:space-y-0 md:gap-10'>
              <input type="text" value={data.nama1} onChange={(e) => setData({...data, nama1:e.target.value})} placeholder='Nama lu' className='font-bold capitalize placeholder:text-zinc-500 py-2 px-5 rounded-md hover:border-blue-400 border-2 border-green-500 focus:border-yellow-500 transition-colors duration-300 ease-in-out w-full md:w-fit' />
              <BsFillArrowThroughHeartFill className="text-pink-500 text-[200px] text-center mx-auto animate-pulse"/>
              <input type="text" value={data.nama2} onChange={(e) => setData({...data, nama2:e.target.value})} placeholder='Nama pacar lu' className='font-bold capitalize placeholder:text-zinc-500 py-2 px-5 rounded-md hover:border-blue-400 border-2 border-green-500 focus:border-yellow-500 transition-colors duration-300 ease-in-out w-full md:w-fit' />
            </div>
            <div className='mx-auto text-center mt-10'>
              <button type='submit' className='animate-bounce mx-auto text-center bg-pink-100 rounded-md shadow-md py-2 px-5 text-pink-500 font-bold uppercase md:mr-4 mb-5 md:mb-0'>
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
