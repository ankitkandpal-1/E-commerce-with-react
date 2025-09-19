import { Routes, Route } from 'react-router'
import { Homepage } from './pages/Homepage'
import { CheckoutPage } from './pages/Checkout-page'
import { Orders } from './pages/Orders'
import './App.css'
import { Tracking } from './pages/Tracking'
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {

  const [cart, setcart] = useState([]);
  const fetchAppData = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setcart(response.data);
    };
  useEffect(() => {

    fetchAppData();
  }, []);


  return (
    <Routes>
      <Route index element={<Homepage cart={cart} fetchAppData={fetchAppData}/>} />
      <Route path="/Checkout-page" element={<CheckoutPage cart={cart} fetchAppData={fetchAppData}/>} />
      <Route path="/Orders" element={<Orders cart={cart} />} />
      <Route path="/Tracking" element={<Tracking />} />
    </Routes>

  )
}

export default App
