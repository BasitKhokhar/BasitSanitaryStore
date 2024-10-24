import React, { useState } from 'react';

const Login = ({ toggleSignupForm }) => {
  const [formData, setFormData] = useState({ 
    email: '',
    password: ''
   });

   const [emailError, setEmailError] = useState(false);
  
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
  
   const validateEmail = (email) => {
       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (email === '') {
           setEmailError(false);  
       } else {
           setEmailError(!emailPattern.test(email));  
       }
   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.userId) {
      localStorage.setItem('userId', data.userId); 
      alert(data.message);
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <form className="bg-white p-6 rounded shadow-md mx-4 w-full sm:w-full md:w-2/4 lg:w-2/4" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <div className=' flex items-start'>
        <label className=' text-left' >Email</label>
        </div>
        
        <input type="email" name="email" placeholder="Email" className={`mb-4 p-2 border rounded w-full ${emailError ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} required/>
        <div className=' flex items-start'>
        <label className=' text-left' >Password</label>
        </div>
        <input type="password" name="password" placeholder="Password" className="mb-4 p-2 border rounded w-full" onChange={handleChange} required/>
        <button className="bg-[#282828] text-white font-bold py-2 px-12 rounded hover:bg-white hover:text-[#282828] hover:border-black border-2 transition duration-300" type="submit">Login</button>
        <p className="mt-4">Don't have an account? <span className="text-blue-500 font-bold hover:text-black cursor-pointer" onClick={toggleSignupForm}>Signup</span></p>
      </form>
    </div>
  );
};

export default Login;
