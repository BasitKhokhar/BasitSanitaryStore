import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Cart from './Cart';
import LoginForm from './Login/Login';
import SignupForm from './Login/Signup';

const Navbar = ({ userId }) => {
  const [logoimage, setLogoImage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // New state for Checkout
  const location = useLocation();
  
  // Ref for the cart dropdown
  const cartRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/logo_image')
      .then(response => response.json())
      .then(data => setLogoImage(data))
      .catch(error => console.error('Error fetching logo image:', error));
  }, []);

  const toggleLoginForm = () => {
    setIsLoginFormOpen(true);
    setIsSignupFormOpen(false);
  };
  
  const toggleSignupForm = () => {
    setIsSignupFormOpen(true);
    setIsLoginFormOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (isCartOpen && userId) {
      fetch(`/cart?user_id=${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCartItems(data);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [isCartOpen, userId]);

  // Close cart when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);
  // New function to handle checkout
  const handleCheckout = () => {
    setIsCartOpen(false); // Close the cart
    setIsCheckoutOpen(true); // Open the checkout
  };
  useEffect(() => {
    const handleClickOutsideNavbar = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideNavbar);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideNavbar);
    };
  }, [isOpen]);
  return (
    <nav className="bg-[#282828] fixed w-full z-10 top-0 shadow border-b">
      <div className="container mx-auto flex items-center justify-between p-4 ">
        {/* Left side: Logo */}
        <div className="text-white font-bold text-xl">
          <Link to="/">
            {logoimage && logoimage.map((item) => (
              <div key={item.id}>
                <img src={item.image_url} alt="" className="h-14" />
              </div>
            ))}
          </Link>
        </div>

        {/* Middle: Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${isActive('/') ? 'bg-white text-[#282828] rounded-full' : 'text-white'}`}>Home</Link>
          <Link to="/products" className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${isActive('/products') ? 'bg-white text-[#282828] rounded-full' : 'text-white'}`}>Products</Link>
          <Link to="/services" className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${isActive('/services') ? 'bg-white text-[#282828] rounded-full' : 'text-white'}`}>Services</Link>
          <Link to="/contact" className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${isActive('/contact') ? 'bg-white text-[#282828] rounded-full' : 'text-white'}`}>Contact</Link>
          <Link to="/about" className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${isActive('/about') ? 'bg-white text-[#282828] rounded-full' : 'text-white'}`}>About Us</Link>
        </div>

        {/* Icons */}
        <div className="hidden md:flex space-x-4">
          <button onClick={toggleCart} className="text-white border-none hover:border-none hover:text-[#282828] bg-transparent hover:bg-white rounded-full p-2 transition-all duration-300">
            <FaShoppingCart size={24} />
          </button>
          <button onClick={toggleLoginForm} className="text-white border-none hover:border-none hover:text-[#282828] bg-transparent hover:bg-white rounded-full p-2 transition-all duration-300">
            <FaUser size={24} />
          </button>
        </div>

        {/* Menu for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#282828] bg-white border-none hover:border-none p-2 rounded-full focus:outline-none transition-all duration-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div ref={navbarRef} className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-[#282828] mt-2 flex flex-col`} >
        <Link to="/" onClick={closeMenu}
          className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${ isActive('/') ? 'bg-white text-[#282828] rounded-full' : 'text-white'
          }`}>
          Home
        </Link>
        <Link to="/products" onClick={closeMenu}
          className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${
            isActive('/products') ? 'bg-white text-[#282828] rounded-full' : 'text-white'
          }`}>
          Products
        </Link>
        <Link to="/services" onClick={closeMenu}
          className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${
            isActive('/services') ? 'bg-white text-[#282828] rounded-full' : 'text-white'
          }`}>
          Services
        </Link>
        <Link to="/contact" onClick={closeMenu}
          className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${
            isActive('/contact') ? 'bg-white text-[#282828] rounded-full' : 'text-white'
          }`}>
          Contact
        </Link>
        <Link to="/about" onClick={closeMenu}
          className={`text-[#282828] hover:text-[#282828] hover:bg-white hover:rounded-full p-2 transition-all duration-300 ${
            isActive('/about') ? 'bg-white text-[#282828] rounded-full' : 'text-white'
          }`}>
          About Us
        </Link>
        {/* Cart and Login icons in mobile view */}
        <Link to="/cart" onClick={toggleCart}
          className="text-white border-none hover:text-[#282828] hover:bg-white hover:rounded-full p-2 flex items-center justify-center transition-all duration-300">
          <FaShoppingCart size={20} />
          <span className="ml-2">Cart</span>
        </Link>
        <Link to="/login" onClick={toggleLoginForm}
          className="text-white border-none hover:text-[#282828] hover:bg-white hover:rounded-full p-2 flex items-center justify-center transition-all duration-300">
          <FaUser size={20} />
          <span className="ml-2">Login</span>
        </Link>
      </div>
      {/* Cart Dropdown */}
      {isCartOpen && (
        <div ref={cartRef} className="absolute top-20 left-1/2 transform -translate-x-1/2 transition duration-500 shadow-lg p-2 w-full sm:w-full md:w-full lg:w-2/4 bg-white">
          <Cart cartItems={cartItems} loggedInUserId={userId} onCheckout={handleCheckout} closeCart={closeCart}/> {/* Pass handleCheckout to Cart */}
        </div>
      )}
      {/* Conditionally render login or signup forms */}
      {isLoginFormOpen && <LoginForm toggleSignupForm={toggleSignupForm} />}
      {isSignupFormOpen && <SignupForm toggleLoginForm={toggleLoginForm} />}   
      {/* Checkout Component - render it conditionally based on the state */}
      {isCheckoutOpen && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 shadow-lg p-4 w-full sm:w-full md:w-full lg:w-2/4 bg-white">
          {/* Your Checkout component here */}
          <h2 className="text-xl font-bold">Checkout</h2>
          {/* Add your Checkout component logic and display */}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
