import React, { useEffect, useState } from 'react'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function Payment_methods() {
  const[payment, setPayment]= useState()
  useEffect(()=>{
     fetch(`${API_BASE_URL}/payment_methods`)
     .then(response =>response.json())
     .then(data => setPayment(data))
     .catch(error => console.error("the error is",error))
  })


  return (
    <div className=' mx-4 sm:mx-4 md:mx-6 lg:mx-14'>
        <h1 className='text-3xl font-bold text-center my-8'>Payment Methods</h1>
        <p className=' mb-3'>After filling the Delivery Form, you have to pay 25% in advance by the folllowing payment methods and remaining will be on delivery. <b>Keep in Contact.</b></p>
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {
            payment && payment.map((items)=>{
                return(
                    <div className=' flex flex-col gap-4 justify-center items-center'>
                        <span className=' p-2'><img src={items.image_url} alt="" className=' w-full h-auto p-4' /></span>
                        <span className=' text-xl font-bold text-left underline cursor-pointer'>{items.number}</span>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}
