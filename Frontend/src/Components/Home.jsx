import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './Loader';
import Navbar from './Navbar';
import ImageSlider from './Slider';
import Categories from './Categories';
import Brands from './Brands';
import Cart from './Cart';
import Customer_Support from './Customer_Support';
import AllProducts from './AllProducts';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TypingComponent from './TypingComponent';
import TrendingProducts from './TrendingProducts';

export default function Home({ loggedInUserId }) {
  console.log("userid in Home:", loggedInUserId)
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [homedata, setHomeData] = useState({
    sliderData: [],
    homeParaData: [],
    CategoryData: [],
    productsData: [],
    brandsData: [],
    customersupportData: [],
    videosData: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const apiEndpoints = [
      { key: 'logoData', url: 'http://localhost:5000/logo_image' },
      { key: 'homeParaData', url: 'http://localhost:5000/home_paragraphs' },
      { key: 'sliderData', url: 'http://localhost:5000/sliderimages' },
      { key: 'CategoryData', url: 'http://localhost:5000/categories' },
      { key: 'brandsData', url: 'http://localhost:5000/brands' },
      { key: 'customersupportData', url: 'http://localhost:5000/customer_supportoptions' },
      { key: 'videosData', url: 'http://localhost:5000/home_videos' }
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
        setHomeData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Loader />
  }
  console.log('Home Page data:', homedata)

  return (
    <div>
      {/* <div><Navbar userId={userId}/></div> */}
      <ImageSlider sliderData={homedata.sliderData} />
      <div className='mx-4 sm:mx-4 md:mx-6 lg:mx-14 my-20'>
        {
          homedata.homeParaData && homedata.homeParaData.map((items) => {
            return (
              <div className=' grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                <div className=' flex flex-col text-left gap-4 py-4' data-aos="fade-up">
                  <div className=' text-2xl font-bold'>{items.heading}</div>
                  <div>{items.description}</div>
                </div>
                <div className=' pl-10' data-aos="zoom-in">
                  <img src={items.image_url} alt="" className=' w-full h-96 rounded' />
                </div>
              </div>
            )
          })
        }
      </div>
      <div className=' mt-12'>
        <Categories categoriesData={homedata.CategoryData} />
      </div>
      
      <div>
        <TrendingProducts loggedInUserId={loggedInUserId} />
      </div>
      <div className='mt-12 mb-12'>
        {/* <h2 className="text-3xl font-bold text-center mb-4">Featured Videos</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mx-4 sm:mx-4 md:mx-6 lg:mx-14">
          {homedata.videosData && homedata.videosData.map((video) => (
            <div key={video.id} className="w-full" data-aos="flip-up">
              {/* <div>{video.title}</div> */}
              <video className="w-full h-96 rounded-lg shadow-lg" controls autoPlay muted loop>
                <source src={video.video_url} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Customer_Support customerSupportdata={homedata.customersupportData} />
      </div>
      <div>
        <Brands brandsdata={homedata.brandsData} />
      </div>
    </div>
  );
}
