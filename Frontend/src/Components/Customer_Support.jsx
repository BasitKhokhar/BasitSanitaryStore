import React from 'react'
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Customer_Support({ customerSupportdata }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
  return (
    <div className=' bg-[#282828] text-white px-4 sm:px-4 md:px-6 lg:px-6 my-4'>
      <div className='grid gap-4 justify-start sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 '>
        {
          customerSupportdata && customerSupportdata.map((items) => {
            return (
              <div key={items.id} className='  flex flex-row gap-4 px-2 justify-center py-8' data-aos="flip-up">
                <div className=' flex flex-col'>
                  <div className=' flex justify-center items-center pb-3'><span className=' bg-white text-[#282828] text-2xl px-[20px] py-4 rounded-full'><i className={items.icons} ></i></span></div>
                  <span className=' text-base font-semibold'>{items.headings}</span>
                  <span className=' text-sm'>{items.description}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
