import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductModal from './ProductModel'; // Import the ProductModal component
import SkeletonLoader from './SkeletonLoader'; // Import the SkeletonLoader component
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Products({ loggedInUserId }) {  
  console.log("userid in products:",loggedInUserId)

 // this useeffesct is for Animation //
 useEffect(() => {
  AOS.init({
    duration: 1200,
  });
}, []);

  const { subcategoryId } = useParams(); // Get subcategoryId from the URL
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [cartItems, setCartItems] = useState([]); // State to manage cart items
  const [loading, setLoading] = useState(true); // State for loading
  const [imageLoading, setImageLoading] = useState({}); // New state to track image loading status

  useEffect(() => {
    // Fetch products based on the subcategoryId
    setLoading(true); // Set loading to true before fetch
    fetch(`http://localhost:5000/subcategories/${subcategoryId}/products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [subcategoryId]);

  const handleProductClick = (product) => {
    setSelectedProduct(product); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedProduct(null); 
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]); 
    console.log('Cart Items:', cartItems);
  };

  const handleImageLoad = (productId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [productId]: false, // Set image loading to false after the image loads
    }));
  };

  const handleImageError = (productId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [productId]: false, // Set loading to false even if there's an error
    }));
  };

  return (
    <div className='flex flex-col justify-center items-center mx-4 my-4 sm:mx-4 md:mx-6 lg:mx-14 mt-20 mb-16'>
      <h1 className='text-2xl font-bold m-4'>Products</h1>

      {/* Show loader when products are being fetched */}
      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-4 sm:mx-4 md:mx-6 lg:mx-14 gap-4'>
          {/* Display multiple skeleton loaders */}
          {[...Array(8)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <div className='grid justify-center items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
          {products && products.map((product) => (
            <div key={product.id} className='border p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => handleProductClick(product)}>
              <div className='relative w-full h-64' data-aos="zoom-in">
                {imageLoading[product.id] !== false && (
                  // this is Skeleton loader for image //
                  <div className="bg-gray-300 animate-pulse w-full h-full absolute top-0 left-0"></div> 
                )}
                <img src={product.image_url} alt={product.name} className='w-full h-full object-cover'
                // Hide image until loaded //
                  style={imageLoading[product.id] === false ? {} : { display: 'none' }} 
                  onLoad={() => handleImageLoad(product.id)} onError={() => handleImageError(product.id)}/>
              </div>
              <h2 className='mt-2 text-lg font-medium'>{product.name}</h2>
              <p className='mt-1'>Rs.{product.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Render Product Modal if it's open */}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
          // Pass loggedInUserId to ProductModal
          userid={loggedInUserId}  
        />
      )}
    </div>
  );
}
