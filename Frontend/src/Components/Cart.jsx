import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cart = ({ loggedInUserId ,closeCart }) => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cart items for the loggedInUserId
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cart/${loggedInUserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load cart items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [loggedInUserId]);

  // Calculate the total amount whenever cartItems changes
  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [cartItems]);

  // Handle removing an item from the cart
  const handleRemoveFromCart = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${loggedInUserId}/${cartId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove product from cart');
      }
      setCartItems((prevItems) => prevItems.filter((item) => item.cart_id !== cartId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle quantity change (increment or decrement)
  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    try {
      const response = await fetch(`http://localhost:5000/cart/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity, user_id: loggedInUserId }),
      });
      if (!response.ok) {
        throw new Error('Failed to update product quantity');
      }
      // Update the cart items state with new quantity and price
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="bg-lightgray w-full flex justify-center" >
      <div className="w-full sm:w-full md:w-4/5 lg:w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-[#282828]">Your Cart</h1>
        <div className="overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-100" style={{ maxHeight: '55vh' }}>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className=' text-[#282828]'>
                <th className="p-2">Products</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Total Price</th>
                <th className="p-2">Remove</th>
              </tr>
            </thead>
            <tbody className=' px-2' data-aos="fade-up">
              {cartItems.map((item) => (
                <tr key={item.cart_id} className='border-t border-b' >
                  {/* First Column: Product Details */}
                  <td className="p-4 text-[#282828]">
                    <div className="flex flex-col gap-4 items-center sm:flex-col md:flex-row lg:flex-row">
                      <div>
                        <img src={item.image_url} alt={item.name} className="w-16 h-auto" />
                      </div>

                      <div className=' text-left'>
                        <h2 className="text-base font-bold">{item.name}</h2>
                        <p className='text-sm'>Price: {item.price} Rupees</p>
                      </div>
                    </div>
                  </td>

                  {/* Second Column: Quantity Buttons */}
                  <td className="p-4 ">
                    <div className='flex items-center justify-center'>
                      <button onClick={() => handleQuantityChange(item.cart_id, item.quantity - 1)}
                        className="bg-gray-300 py-0 px-2 rounded hover:bg-gray-400">
                        -
                      </button>
                      <span className="mx-4">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.cart_id, item.quantity + 1)}
                        className="bg-gray-300 py-0 px-2 rounded hover:bg-gray-400">
                        +
                      </button>
                    </div>
                  </td>

                  {/* Third Column: Total Price */}
                  <td className="p-4 text-[#282828] text-sm">
                    {item.price * item.quantity}
                  </td>

                  {/* Fourth Column: Remove Button with Delete Icon */}
                  <td className="p-4" >
                    <button onClick={() => handleRemoveFromCart(item.cart_id)}
                      className="flex justify-center border-none items-center bg-red-500 text-white p-2 rounded hover:border-none hover:bg-red-600">
                      <i className="fas fa-trash-alt mr-1"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Display total amount at the bottom */}
        <div className="mt-4 flex px-4 justify-between">
          <h2 className="text-lg font-bold text-[#282828]">Total Amount: </h2>
          <h2 className='font-semibold'>{totalAmount} Rupees</h2>
        </div>
        <div className=' text-right mr-5 mt-3 mb-1' >
        <Link 
            to="/checkout" 
            state={{ cartItems, totalAmount }}
            onClick={closeCart} // Passing cartItems and totalAmount as state
          >
            <button className='bg-[#282828] text-white font-bold rounded-full px-16 border-2 border-black hover:bg-white hover:text-[#282828]  hover:border-[#282828] transition duration-500'>
              Checkout
            </button>
          </Link>

        </div>
      </div>
    </div>

  );
};

export default Cart;
