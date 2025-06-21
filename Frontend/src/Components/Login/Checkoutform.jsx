import React, { useState } from 'react';
import { storage } from '../firebase'; // Make sure your firebase.js is correctly exporting `storage`
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CheckoutForm({ userId,shippingCost, finalTotal,cartItems }) {
  console.log("data coming in checkout form", userId, shippingCost, finalTotal,cartItems )
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    Fname: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'email') validateEmail(value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(email !== '' && !emailPattern.test(email));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setSelectedFile(file);

    const storageRef = ref(storage, `WebOrders_receipts/${Date.now()}_${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      console.log('✅ Uploaded image URL:', url);
    } catch (error) {
      console.error('❌ Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!imageUrl) {
      alert('Please upload a receipt image before submitting.');
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      receipt_url: imageUrl,userId, shippingCost, finalTotal,cartItems
    };

    try {
      const res = await fetch(`${API_BASE_URL}/checkout_form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error('❌ Submission failed');
        alert('Error submitting form');
      } else {
        alert('Form submitted successfully!');
        setFormData({ Fname: '', email: '', phone: '', city: '', address: '' });
        setImageUrl(null);
        setSelectedFile(null);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="bg-[#282828] text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="text-black text-sm font-bold pb-2">
          <h1 className="text-3xl text-white">Delivery</h1>
        </div>

        {/* Name */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-bold mb-2 text-left" htmlFor="Fname">Name:</label>
          <input
            type="text"
            name="Fname"
            value={formData.Fname}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* Phone and Email */}
        <div className="flex flex-col gap-4 mt-3 md:flex-row">
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="phone">Phone No:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`shadow appearance-none border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700`}
            />
          </div>
        </div>

        {/* City and Address */}
        <div className="flex flex-col gap-4 mt-3 md:flex-row">
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-bold mb-2 text-left" htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2 text-left" htmlFor="receipt">Upload Receipt:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white"
          />
          {uploading && <p className="text-yellow-400 mt-2">Uploading image...</p>}
          {imageUrl && (<div className=' flex justify-center'>
              <img src={imageUrl} alt="Uploaded Receipt" className="mt-4 w-[30%] h-[200px] max-w-sm rounded" />
            </div>
          
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00a97c] text-white rounded-full border-2 border-[#00a97c] hover:bg-[#282828]  hover:border-white font-bold py-2 w-full rounded transition duration-300"
          >
            {loading ? 'Submitting...' : 'Confirm Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
