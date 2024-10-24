import React from 'react'
import { useEffect, useState } from 'react';
import Loader from './Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function About() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [aboutdata, setAboutData] = useState({
    aboutMsgsData: [],
    aboutimageData: [],
    aboutusData: [],
    aboutmissionData: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const apiEndpoints = [
      { key: 'aboutMsgsData', url: 'http://localhost:5000/about' },
      { key: 'aboutimageData', url: 'http://localhost:5000/about_image' },
      { key: 'aboutusData', url: 'http://localhost:5000/aboutus' },
      { key: 'aboutmissionData', url: 'http://localhost:5000/about_mission' }
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
        setAboutData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Loader />
  }
  console.log('About Page data:', aboutdata)
  return (
    <div className='mx-4 sm:mx-4 md:mx-6 lg:mx-14'>
      <h1 className='text-3xl font-bold mt-32' data-aos="fade-up">About Us</h1>
      {/* aboutus para */}
      <div className=' flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4'>
        <div className='w-full sm:w-full md:w-full lg:w-2/4 mt-12'>
          { aboutdata.aboutimageData && aboutdata.aboutimageData.map((item) => {
              return (
                <div className='h-[70vh]' key={item.id} data-aos="zoom-in">
                  <img src={item.image_url} alt="" className=' w-full h-full rounded ' />
                </div>
              )
            })
          }
        </div>
        <div className='flex flex-col gap-2 sm:w-full md:w-full  lg:w-2/3 font-medium text-left mt-11'>
          {
            aboutdata.aboutusData && aboutdata.aboutusData.map((items) => {
              return (
                <div key={items.id} data-aos="fade-up" className=' py-1'>
                  {items.about_us}
                </div>
              )
            })
          }
        </div>
      </div>
      {/* aboutmission & vission para */}
      <div >
        <div><h1 className='text-3xl font-bold my-6'>Mission & Vission</h1></div>
        <div className=' flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4 my-6 text-left  '>
          {
            aboutdata.aboutmissionData && aboutdata.aboutmissionData.map((items) => {
              return (
                <div className='rounded-md' key={items.id} data-aos="zoom-in">
                  <div className='border bg-[#282828] text-white text- p-4 rounded-lg'>{items.aboutmission}</div>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* owners list */}
      <div className=' mb-8'>
        {
          aboutdata.aboutMsgsData && aboutdata.aboutMsgsData.map((items) => {
            return (
              <div key={items.id} >
                <div className=' bg-[#AA6231] inline-block text-white px-5 py-3 font-bold my-6 rounded ' data-aos="fade-up">{items.Position}</div>
                <div className='grid sm:grid-cols-1  md:grid-cols1 lg:grid-cols-2'>
                  <div className=' flex justify-center' data-aos="zoom-in">
                    <img key={items.id} src={items.image_url} alt="" className=' w-2/4 rounded border-gray-400 border p-3' />
                  </div>
                  <div className=' flex flex-col text-left justify-center'>
                    <div className=' text-xl font-bold' data-aos="fade-up"><h2>{items.name}</h2></div>
                    <div data-aos="fade-up">{items.description}</div>
                    <div className=' mt-2'><span className=' text-lg font-semibold'>Contact: </span> {items.contact}</div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
