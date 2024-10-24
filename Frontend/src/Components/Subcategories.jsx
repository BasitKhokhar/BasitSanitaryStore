import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SkeletonLoader from './SkeletonLoader';  // Import SkeletonLoader
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Subcategories() {

 // this useeffesct is for Animation //
 useEffect(() => {
  AOS.init({
    duration: 1200,
  });
}, []);

  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [imageLoading, setImageLoading] = useState({}); 

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/categories/${categoryId}/subcategories`)
      .then(response => response.json())
      .then(data => {
        setSubcategories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching subcategories:', error);
        setLoading(false);
      });
  }, [categoryId]);

  const handleImageLoad = (subcategoryId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [subcategoryId]: false,
    }));
  };

  const handleImageError = (subcategoryId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [subcategoryId]: false,
    }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-4 sm:mx-4 md:mx-6 lg:mx-14 gap-4">
        {/* Display skeleton loaders while data is loading */}
        {Array(8).fill(0).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center mx-4 sm:mx-4 md:mx-6 lg:mx-14 mt-24 mb-16'>
      <h1 className='text-2xl font-bold m-4 text-[#282828]'>Subcategories</h1>
      <div className='grid justify-center items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4'>
        {subcategories.map((item) => (
          <Link
            to={`/category/${categoryId}/subcategory/${item.id}`}
            key={item.id}
            className='flex flex-col justify-center items-center border p-4 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300'>
            <div className='w-full h-64 relative' data-aos="zoom-in">
              {/* Skeleton loader for image */}
              {imageLoading[item.id] !== false && (
                <div className="bg-gray-300 animate-pulse w-full h-full absolute top-0 left-0"></div>
              )}
              <img src={item.image_url} alt={item.name} className="w-full h-full object-cover"
                style={imageLoading[item.id] === false ? {} : { display: 'none' }} 
                onLoad={() => handleImageLoad(item.id)} onError={() => handleImageError(item.id)}/>
            </div>
            <div className='mt-2'>
              <h2 className='text-center text-lg font-medium'>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
