
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Categories({ categoriesData }) {
   useEffect(() => {
    AOS.refresh();
  }, [categoriesData]);
  return (
    <div className=' mx-4 sm:mx-4 md:mx-6 lg:mx-14'>
      <h1 className='text-3xl font-bold mb-8 mt-4 text-[#282828]'>All Categories</h1>
      <div className='grid w-full items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-0 gap-4 my-4'>
        {
          categoriesData && categoriesData.map((items) => {
            return (
              <Link to={`/category/${items.id}`} key={items.id}
                className='flex flex-col items-center border p-4 rounded-lg shadow-lg bg- hover:bg-gray-300 transition duration-300'>
                <div className='w-full h-full flex justify-center' data-aos="zoom-in">
                  <img src={items.image_url} alt={items.name} className='w-full h-64' />
                </div>
                <div className='mt-2' data-aos="fade-up">
                  <h2 className='text-center text-lg font-medium text-[#282828]'>{items.name}</h2>
                </div>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}
