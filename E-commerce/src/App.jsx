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

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setcart(response.data);
      });
  }, []);


  return (
    <Routes>
      <Route index element={<Homepage cart={cart}/>} />
      <Route path="/Checkout-page" element={<CheckoutPage cart={cart} />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/Tracking" element={<Tracking />} />
    </Routes>

  )
}

export default App
