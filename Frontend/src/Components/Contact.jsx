import React from 'react'
import { useEffect, useState } from 'react';
import Loader from './Loader';
import FormComponent from './Login/conatctForm'
import AOS from 'aos';
import 'aos/dist/aos.css';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function Contact() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [contactdata, setContactData] = useState({
    contactListData: [],
    mapImageData: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const apiEndpoints = [
      { key: 'mapImageData', url: `${API_BASE_URL}/map_image` },
      { key: 'contactListData', url: `${API_BASE_URL}/contact_list` },
    ];
    Promise.all(
      apiEndpoints.map((endpoint) =>
        fetch(endpoint.url)
          .then((response) => response.json())
          .then((data) => {
            return { key: endpoint.key, data };
          })
          .catch((error) => ({ key: endpoint.key, data: [], error }))
      )
    )
      .then((results) => {
        const updatedData = results.reduce((acc, result) => {
          acc[result.key] = result.data;
          return acc;
        }, {});
        setContactData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Loader />
  }
  console.log('Contact Page data:', contactdata)
  return (
    <div className='mx-4 sm:mx-4 md:mx-6 lg:mx-14'>
      <h1 className='text-3xl font-bold mt-32 ' data-aos="fade-up">Contact</h1>
      <div>
        <div className=' grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' data-aos="flip-up">
          {
            contactdata.contactListData && contactdata.contactListData.map((items) => {
              return (
                <div className='flex pl-4 gap-3 py-6 my-6 bg-slate-100 rounded-md'>
                  <span className=' bg-[#282828] text-white py-5 px-6 rounded-full text-2xl'><i className={items.icons}></i></span>
                  <span className='cursor-pointer flex flex-col text-left mt-3'><span className=' font-semibold'>{items.description}</span>{items.contact_list_items}<span></span></span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row  gap-5 h-auto ' data-aos="fade-up">
        <div className=' sm:w-full md:w-full  lg:w-2/4 h-full'>
          {
            contactdata.mapImageData && contactdata.mapImageData.map((item) => {
              return (
                <div >
                  <img src={item.image_url} alt="" className=' w-full h-full' />
                </div>
              )
            })
          }
        </div>
        <div><FormComponent /></div>
      </div>
    </div>
  )
}
