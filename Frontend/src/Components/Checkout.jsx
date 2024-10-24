import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CheckoutForm from './Login/Checkoutform';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Checkout = () => {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const location = useLocation();
  const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

  // State to store shipping cost
  const [shippingCost, setShippingCost] = useState(0);

  // Calculate shipping charges based on total amount
  useEffect(() => {
    if (totalAmount < 200000) {
      setShippingCost(3000);  // Add 3000 Rupees shipping cost if total is less than 200000
    } else {
      setShippingCost(0);  // Free shipping if total amount is 200000 or more
    }
  }, [totalAmount]);

  // Calculate final total including shipping cost
  const finalTotal = totalAmount + shippingCost;

  if (!cartItems.length) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="bg-lightgray w-full mb-10">
      {/* <h1 className="text-2xl font-bold mt-24 mb-4 text-center text-[#282828]" data-aos="fade-up">Checkout</h1> */}
      <div className="flex flex-col-reverse gap-6 px-3 justify-center sm:flex-col-reverse sm:px-3 md:flex-col-reverse md:px-6 lg:flex-row lg:px-12 mt-24">
        <div className="w-full" data-aos="fade-up">
          <p className=' text-left text-semibold my-1'>Fill this form, if you want delivery.</p>
          <CheckoutForm />
        </div>
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
                    <td className=" text-[#282828]">
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

          {/* Display total amount and shipping cost */}
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

          <div className="text-right mr-5 mt-8 mb-1">
            <Link to="/">
              <button className="bg-[#282828] text-white font-bold rounded-full px-12 border-2 border-black hover:bg-white hover:text-[#282828] hover:border-[#282828] transition duration-500">
                Confirm Purchase
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
