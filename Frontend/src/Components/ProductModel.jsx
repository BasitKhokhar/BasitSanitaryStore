import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ProductModal = ({ product, onClose, onAddToCart, userid }) => {
  console.log('userid in productmodel',userid)
  // const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleAddToCart = async () => {
    const productWithOptions = {
      ...product,
      selectedColor,
      quantity: 1,
      user_id: userid, // Include userId here
    };
    
    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productWithOptions),
      });
  
      if (response.ok) {
        onAddToCart(productWithOptions); // Pass product with options
        onClose(); // Close the modal after adding to cart
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
console.log(userid)
console.log(product)
  return (
    <div className="fixed inset-0 flex  items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          <FaTimes size={20} />
        </button>
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row justify-center items-center">
          <img src={product.image_url} alt={product.name} className="w-1/2 h-auto" />
          <div className="ml-4 text-left">
            <h2 className="text-xl font-bold text-left">Name: {product.name}</h2>
            <p className="mt-2 font-semibold">Stock: {product.stock}</p>
            <div className="mt-4">
              <label className="block font-semibold">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="border rounded p-1"
              >
                <option value="None">None</option>
                <option value="White">White</option>
                <option value="Half White">Half White</option>
                <option value="Chrome">Chrome</option>
                <option value="Light Pink">Light Pink</option>
                <option value="Light Grey">Light Grey</option>
                <option value="Burgandy">Burgandy</option>
                {/*if want to Add other color options */}
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-[#282828] border-2 border-[#282828] text-white p-2 rounded hover:bg-white hover:text-[#282828] hover:border-[#282828] transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
