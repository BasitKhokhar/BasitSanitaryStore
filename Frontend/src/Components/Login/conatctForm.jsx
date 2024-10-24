import React, { useState } from 'react';

const FormComponent = () => {
    // for Loader state //
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '', 
        description: ''
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
    // for Email validation function
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Do not show red border if the field is empty
        if (email === '') {
            setEmailError(false);  
        } else {
            setEmailError(!emailPattern.test(email));  
        }
    };
    // Handle form submission
    const Submit = (e) => {
        e.preventDefault();
        if (emailError) {
            alert('Please enter a valid email address.');
            return; 
        }
        setLoading(true);
        fetch('http://localhost:5000/submit', {
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
        <div className=" mx-auto">
            <form onSubmit={Submit} className="bg-[#282828] text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="text-black text-sm font-bold pb-2">
                    <h1 className='text-3xl text-white'>Contact Us For Any Queries!</h1>
                </div>
                <div className=' flex gap-4 mt-3'>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-left" htmlFor="name">Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-left" htmlFor="phone">Phone No:</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange}   // <-- Fixed phone value here
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required/>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left" htmlFor="email">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className={`shadow appearance-none border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        required/>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2 text-left" htmlFor="description">Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} maxLength="1500"
                        className="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required/>
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-[#00a97c] text-white rounded-full border-2 border-[#00a97c] hover:bg-[#282828]  hover:border-white  font-bold py-2 w-full rounded transition duration-300"
                        disabled={loading}> {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormComponent;
