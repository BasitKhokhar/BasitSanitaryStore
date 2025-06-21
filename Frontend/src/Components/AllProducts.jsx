import React, { useEffect, useState } from 'react';
import ProductModal from './ProductModel';
import Loader from './Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SkeletonLoader from './SkeletonLoader'; 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function AllProducts({ loggedInUserId }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [productsdata, setProductsData] = useState({
    productsData: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/products`)
      .then(response => response.json())
      .then(data => {
        setProductsData({ productsData: data });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      productsdata.productsData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, productsdata.productsData]);

  const handleImageLoad = (productId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  const handleImageError = (productId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-4 sm:mx-4 md:mx-6 lg:mx-14 gap-4 mt-40">
        {Array(16).fill(0).map((_, index) => (
            <SkeletonLoader key={index} /> 
          ))}
      </div>
    );
  }
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="mx-4 sm:mx-4 md:mx-6 lg:mx-14 mb-10">
      <h1 className="text-3xl font-bold mt-32 mb-6">All Products</h1>
      <div className="flex justify-end mb-4">
        <input type="text" placeholder="Search products..." className="border rounded p-2 w-full md:w-1/3"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <tbody className="grid justify-center items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <tr key={product.id} className="flex flex-col border-none text-black relative rounded-lg shadow-lg hover:bg-gray-300 transition duration-300"
                onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}>
                <td className="p-2 border rounded-lg flex flex-col gap-2 text-left box-border" data-aos="zoom-in">
                  {/* Image with Skeleton Loader */}
                  <div className="w-full h-64 relative">
                    {imageLoading[product.id] !== false && (
                      <div className="bg-gray-300 animate-pulse w-full h-full absolute top-0 left-0"></div> // Skeleton loader
                    )}
                    <img src={product.image_url} alt="Product Image" className="w-full h-full object-cover"
                      style={imageLoading[product.id] === false ? {} : { display: 'none' }} // Hide image until loaded
                      onLoad={() => handleImageLoad(product.id)} onError={() => handleImageError(product.id)}/>
                  </div>
                  <span className="font-bold text-lg">Name: <span className="text-base font-medium">{product.name}</span></span>
                  <span className="font-bold">Price: <span className="text-base font-medium">{product.price}</span></span>
                  <span className="font-bold">Stock: <span className="text-base font-medium">{product.stock}</span></span>

                  {/* Add to Cart Icon */}
                  {hoveredProduct === product.id && (
                    <button className="absolute top-2 right-2 bg-[#282828] text-white p-2 rounded-full" onClick={() => handleAddToCartClick(product)}>
                      🛒
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 border mx-1 ${currentPage === index + 1 ? 'bg-[#282828] text-white' : 'bg-white'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={(productWithOptions) => {
          console.log('Added to cart:', productWithOptions);
          }}
          userid={loggedInUserId}
        />
      )}
    </div>
  );
}
