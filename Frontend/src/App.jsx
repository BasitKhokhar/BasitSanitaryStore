import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import AllProducts from './Components/AllProducts';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Subcategories from './Components/Subcategories'; 
import Footer from './Components/Footer';
import Services from './Components/Services';
import Contact from './Components/Contact';
import './App.css';
import Checkout from './Components/Checkout';

function App() {
  const [userId, setUserId] = useState(null); 
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log("Logged-in user ID:", storedUserId);
    }
  }, []);
  console.log('LgedIn UserId is:',userId)
  return (
    <Router>
      <div className="min-h-screen box-border p-0 m-0 overflow-hidden">
        <Navbar userId={userId}/>
        <div className="mt-8">
          <Routes>
            <Route path="/" element={<Home  loggedInUserId={userId}/> } />
            <Route path="/about" element={<About/>} />
            <Route path="/products" element={<AllProducts loggedInUserId={userId}/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path='/checkout' element={<Checkout />} />
            {/* Dynamic Routes for Categories and Subcategories that will route on basis of ID */}
            <Route path="/category/:categoryId" element={<Subcategories/>}  />
            <Route path="/category/:categoryId/subcategory/:subcategoryId" element={<Products loggedInUserId={userId}/>}  />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
