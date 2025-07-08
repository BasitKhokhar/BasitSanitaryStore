import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import CheckoutForm from './Login/Checkoutform';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Payment_methods from './Payment_methods';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, totalAmount, loggedInUserId, userName } = location.state || { cartItems: [], totalAmount: 0 };
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    setShippingCost(totalAmount < 200000 ? 3000 : 0);
  }, [totalAmount]);

  const finalTotal = totalAmount + shippingCost;

  const handleOrderSubmit = async () => {
    const orderData = {
      orderId: Date.now(),
      userId: loggedInUserId,
      userName: userName,
      totalAmount,
      shippingCost,
      finalTotal,
      totalItems: cartItems.length,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order successfully stored!');
        navigate('/');
      } else {
        throw new Error('Failed to store order data.');
      }
    } catch (error) {
      console.error('Error storing order:', error);
      alert('Error storing order data. Please try again.');
    }
  };

  if (!cartItems.length) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="bg-lightgray w-full mb-10">
      <div className="flex flex-col gap-6 px-3 justify-center sm:flex-col sm:px-3 md:flex-col md:px-6 lg:flex-row lg:px-12 mt-24">
        <div className="w-full" data-aos="fade-up">
          <div className="overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-100" style={{ maxHeight: '70vh' }}>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-[#282828]">
                  <th className="p-2">#</th>
                  <th className="p-2">Products</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total Price</th>
                </tr>
              </thead>
              <tbody className="px-2">
                {cartItems.map((item, index) => (
                  <tr key={item.cart_id} className="border-t border-b">
                    <td className="p-4 text-[#282828] text-center">{index + 1}</td>
                    <td className="text-[#282828]">
                      <div className="flex flex-col gap-4 items-center sm:flex-col md:flex-row lg:flex-row">
                        <div>
                          <img src={item.image_url} alt={item.name} className="w-12 h-auto" />
                        </div>
                        <div className="text-left">
                          <h2 className="text-sm font-bold">{item.name}</h2>
                          <p className="text-sm">Price: {item.price} Rupees</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4 text-[#282828] text-sm">{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex px-4 justify-between">
            <h2 className="text-lg font-bold text-[#282828]">Sub-total Amount: </h2>
            <h2 className="font-semibold">{totalAmount} Rupees</h2>
          </div>
          <div className="mt-2 flex px-4 justify-between">
            <h2 className="text-lg font-bold text-[#282828]">Shipping Charges: </h2>
            <h2 className="font-semibold">{shippingCost > 0 ? `${shippingCost} Rupees` : 'Free'}</h2>
          </div>
          <div className="mt-2 flex px-4 justify-between">
            <h2 className="text-lg font-bold text-[#282828]">Total Amount: </h2>
            <h2 className="font-semibold">{finalTotal} Rupees</h2>
          </div>
          {/* <div className="text-right mr-5 mt-8 mb-1">
            <button
              onClick={handleOrderSubmit}
              className="bg-[#282828] text-white font-bold rounded-full px-12 border-2 border-black hover:bg-white hover:text-[#282828] hover:border-[#282828] transition duration-500"
            >
              Confirm Order
            </button>
          </div> */}
        </div>
        <div className="w-full" data-aos="fade-up">
          <p className='text-left text-semibold my-1'>Fill this form, if you want delivery.</p>
          <CheckoutForm
            cartItems={cartItems}
            totalAmount={totalAmount}
            shippingCost={shippingCost}
            finalTotal={finalTotal}
            userId={loggedInUserId}
            userName={userName}
          />
        </div>
      </div>
      <div>
        <Payment_methods />
      </div>
    </div>
  );
};

export default Checkout;
