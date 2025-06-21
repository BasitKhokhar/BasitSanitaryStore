import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Services = () => {
      
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
    const [activeTab, setActiveTab] = useState(0);
    const [servicesdata, setServicesData] = useState({
        servicesData: [],
        plumbersData: [],
      });
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        setLoading(true);
        const apiEndpoints = [
          { key: 'servicesData', url: `${API_BASE_URL}/services` },
          { key: 'plumbersData', url: `${API_BASE_URL}/plumbers` }
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
            setServicesData((prevData) => ({
              ...prevData,
              ...updatedData,
            }));
          })
          .finally(() => setLoading(false));
      }, []);
      if (loading) {
        return <Loader />
      }
    console.log('Services Page data:',servicesdata)

    return (
        <div className="mx-4 sm:mx-4 md:mx-6 lg:mx-14">
            <h1 className="text-3xl font-bold mt-32 text-[#282828]" data-aos="fade-up">Services</h1>
            <div className="container">
                <div className="text-center">     
                    <h1 className="my-5 text-3xl font-bold text-[#282828] " data-aos="fade-up">Explore Our Services</h1>
                </div>
                <div className="flex flex-col lg:flex-row">
                    {/* Left Navigation */}
                    <div className="w-full lg:w-1/3">
                        <div className="flex flex-col mr-4"  data-aos="fade-up">
                            { servicesdata.servicesData && servicesdata.servicesData.map((service, index) => (
                                <button key={service.id}
                                    className={`nav-link w-full flex items-center text-start p-4 mb-4 hover:bg-[#656565] hover:text-white ${activeTab === index ? 'active bg-[#282828] text-white' : ''}`}
                                    onClick={() => setActiveTab(index)}>
                                    <h4 className="m-0">{service.title}</h4>
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Right Content */}
                    <div className="w-full lg:w-2/3">
                        <div className="tab-content">
                            { servicesdata.servicesData && servicesdata.servicesData.map((service, index) => (
                                <div key={service.id} className={`tab-pane ${activeTab === index ? 'block' : 'hidden'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative h-80" data-aos="zoom-in">
                                            <img src={service.image} alt={service.title} className="absolute w-full h-full rounded object-cover"/>
                                        </div>
                                        <div className=' text-left' data-aos="fade-up">
                                            <h3 className="mb-3 text-2xl font-bold" >10+ Years Of Experience In Sanitary & Plumbing Services</h3>
                                            <p className="mb-4 text-left">{service.description}</p>
                                            <p className=' font-bold'><i className="fa fa-check text-green-500 me-3"></i>Quality Servicing</p>
                                            <p className=' font-bold'><i className="fa fa-check text-green-500 me-3"></i>Expert Workers</p>
                                            <p className=' font-bold'><i className="fa fa-check text-green-500 me-3"></i>Modern Equipment</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div> <h1 className='text-3xl font-bold my-8' data-aos="fade-up">Our Plumbers</h1></div>
                <div className=' grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10'>
                    { servicesdata.plumbersData && servicesdata.plumbersData.map((items)=>{
                            return(
                                <div className='border p-4 rounded-lg shadow-lg cursor-pointer transition duration-400 hover:bg-gray-300' data-aos="zoom-in">
                                    <div><img src={items.image_url} alt="" /></div>
                                    <div><h2 className=' text-left font-semibold mt-4'>Name: {items.name}</h2></div>
                                    <div><h2 className=' text-left font-semibold'>Contact: {items.contact}</h2></div>
                                </div>                            
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;
