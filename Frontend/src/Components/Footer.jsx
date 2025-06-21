import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Footer() {
  
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [footerdata, setFooterData] = useState({
    logoData: [],
    contactListData: [],
    FooterLinksData: [],
    FooterInfoData: [],
    socialIconsData: []
  });
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiEndpoints = [
      { key: 'logoData', url: 'http://localhost:5000/logo_image' },
      { key: 'contactListData', url: 'http://localhost:5000/contact_list' },
      { key: 'FooterLinksData', url: 'http://localhost:5000/footer_links' },
      { key: 'FooterInfoData', url: 'http://localhost:5000/footer_info' },
      { key: 'socialIconsData', url: 'http://localhost:5000/social_icons' }
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
        setFooterData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
      })
  }, []);
console.log('Footer data:',footerdata)

  return (
    <div className=' bg-[#282828] text-white px-10 py-6'>
      <div className=' grid sm:grid-cols-1 pl-4  md:grid-cols-2 lg:grid-cols-4 gap-4 '>
        {/* footer first column data */}
        <div className=' flex flex-col justify-start'>
          <div>
            <Link to="/">
              {
               footerdata.logoData && footerdata.logoData.map((item) => {
                  return (
                    <div key={item.id} data-aos="fade-up">
                      <img src={item.image_url} alt="" className=' h-16' />
                    </div>
                  )
                })
              }
            </Link>
          </div>
          <div className=' flex flex-col gap-1 mt-3'>
            {
              footerdata.contactListData && footerdata.contactListData.map((items) => {
                return (
                  <div className='flex gap-3' key={items.id} data-aos="fade-up">
                    <span><i className={items.icons}></i></span>
                    <span className='cursor-pointer text-base'>{items.contact_list_items}</span>

                  </div>
                )
              })
            }
          </div>

        </div>
        {/* second column */}
        <div className='flex flex-col text-center align-middle justify-items-center'>
          <div><h1 className='text-2xl font-bold text-left mb-4' data-aos="fade-up">Quick Links</h1></div>
          <div className=' flex flex-col justify-center text-left' data-aos="fade-up">
            { footerdata.FooterLinksData && footerdata.FooterLinksData.map((items) => (
              <div key={items.footer_links_list} className=' text-white flex flex-col cursor-pointer' >
                <Link to={items.routes}>
                  <span className=' text-white hover:text-[#656565]'>{items.footer_links_list}</span>
                </Link>
              </div>
            ))}</div>

        </div>
        {/* third column */}
        <div>
          <div><h1 className='text-2xl font-bold text-left mb-4' data-aos="fade-up">Information</h1></div>
          <div className=' flex flex-col justify-center text-left' data-aos="fade-up">
            {
              footerdata.FooterInfoData && footerdata.FooterInfoData.map((items) => {
                return (
                  <div key={items.footer_info_list}>
                    <Link to={items.routes} >
                      <span className=' text-white hover:text-[#656565]'>{items.footer_info_list}</span>
                    </Link>
                  </div>
                )
              })
            }
          </div>

        </div>
        {/* fourth column */}
        <div className='flex flex-col  text-2xl'>
          <div><h1 className='text-2xl font-bold text-left mb-4' data-aos="fade-up">Socail Links</h1></div>
          <div className='flex gap-5' data-aos="fade-up">
          {
            footerdata.socialIconsData && footerdata.socialIconsData.map((items) => {
              return (
                <div key={items.icons}>
                  <a  href={items.routes}><span className=' text-white hover:text-[#656565]'><i className={items.icons} ></i></span></a>
                </div>
              )
            })
          }
          </div>
          
        </div>
      </div>
      <div className=' flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between px-4 pt-8 gap-4 mb-6'>
          <p>All Rights Reserved By @ Basit Sanitary Store </p>
          <p>Made By <a href="https://basitportfolioweb.netlify.app/" className=' text-[#282828] bg-white border-2 py-1 px-3 rounded-full font-bold hover:text-white hover:bg-[#282828] hover:border-white transition'>B.Creatives</a></p>
        </div>
    </div>
  )
}
