import { Routes , Route } from 'react-router'
import { Homepage } from './pages/Homepage'
import { CheckoutPage } from './pages/Checkout-page'
import { Orders } from './pages/Orders'
import './App.css'
import { Tracking } from './pages/Tracking'


function App() {

  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/Checkout-page" element={<CheckoutPage />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/Tracking" element={<Tracking />} />
    </Routes>
   
  )
}

export default App
