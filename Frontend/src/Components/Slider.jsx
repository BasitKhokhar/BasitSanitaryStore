// Components/Slider.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TypingComponent from './TypingComponent';
import AOS from 'aos';
import 'aos/dist/aos.css';
const ImageSlider = ({ sliderData }) => {
   
    useEffect(() => {
      AOS.init({
        duration: 1200,
      });
    }, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container max-h-[90vh] mt-7 box-border relative">
      <Slider {...settings}>
        {sliderData.map((image) => (
          <div key={image.id} className="h-3/4 w-full m-0 p-0" data-aos="zoom-in">
            <img src={image.sliderimage_url	} alt={`Slide ${image.id}`} className="h-[90vh] w-full object-cover" />
          </div>
        ))}
      </Slider>
      <div className=' absolute top-[40%] left-[5%] z-10'>
        <TypingComponent />
      </div>
      <div className=' bg-black max-h-[90vh] h-[90vh] w-full opacity-40 absolute top-0 left-0'>asasas</div>
    </div>
  );
};

export default ImageSlider;

