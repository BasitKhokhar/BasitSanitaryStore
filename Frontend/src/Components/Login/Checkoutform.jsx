import React, { useState } from 'react';

export default function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Fname: '',
    Lname: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });

  const [emailError, setEmailError] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') {
      validateEmail(value);
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailError(false);
    } else {
      setEmailError(!emailPattern.test(email));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      alert('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    fetch('http://localhost:5000/checkout_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Form submitted successfully!');
          alert('Form submitted successfully!');
        } else {
          console.error('Error submitting form');
          alert('Error Submitting Form');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="bg-[#282828] text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="text-black text-sm font-bold pb-2">
          <h1 className="text-3xl text-white">Delivery</h1>
        </div>

        {/* First Name and Last Name */}
        <div className="flex flex-col gap-4 mt-3 sm:flex-col md:flex-row lg:flex-row">
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="Fname">First Name:</label>
            <input
              type="text"
              name="Fname"
              value={formData.Fname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="Lname">Last Name:</label>
            <input
              type="text"
              name="Lname"
              value={formData.Lname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        {/* Phone and Email */}
        <div className="flex flex-col gap-4 mt-3 sm:flex-col md:flex-row lg:flex-row">
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="phone">Phone No:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              required
            />
          </div>
        </div>

        {/* City and Address */}
        <div className="flex flex-col gap-4 mt-3 sm:flex-col md:flex-row lg:flex-row">
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2 text-left" htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="1500"
            className="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#00a97c] text-white rounded-full border-2 border-[#00a97c] hover:bg-[#282828]  hover:border-white  font-bold py-2 w-full rounded transition duration-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
