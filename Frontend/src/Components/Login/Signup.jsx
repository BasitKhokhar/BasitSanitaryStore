import React, { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Signup = ({ toggleLoginForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: ''
  });

  const [emailError, setEmailError] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // If the field being changed is 'email', validate it
    if (name === 'email') {
      validateEmail(value);
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Show red border if the email is invalid
    setEmailError(!emailPattern.test(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      alert("Please enter a valid email address.");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.message) {
      alert(data.message);
      toggleLoginForm(); // Automatically switch to the Login form after successful signup
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <form className="bg-white p-8 rounded shadow-md mx-4 w-full sm:w-full md:w-2/4 lg:w-2/4" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-bold">Signup</h2>

        {/* Separate input fields */}
        <input type="text" name="name" placeholder="Name" className="mb-4 p-2 border rounded w-full"onChange={handleChange} required/>
        <input type="email" name="email" placeholder="Email" className={`mb-4 p-2 border rounded w-full ${emailError ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} required/>
        <input type="password" name="password" placeholder="Password" className="mb-4 p-2 border rounded w-full" onChange={handleChange} required/>
        <input type="text" name="phone" placeholder="Phone" className="mb-4 p-2 border rounded w-full" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" className="mb-4 p-2 border rounded w-full" onChange={handleChange} required/>
        <button className="bg-[#282828] text-white font-bold py-2 px-12 rounded hover:bg-white hover:text-[#282828] hover:border-black border-2 transition duration-300" type="submit">Signup</button>
        <p className="mt-4">
          Already have an account?{' '}
          <span className="text-blue-500 font-bold hover:text-black cursor-pointer" onClick={toggleLoginForm}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
