import { Routes , Route } from 'react-router'
import { Homepage } from './pages/Homepage'
import { CheckoutPage } from './pages/Checkout-page'
import './App.css'


function App() {

  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/Checkout-page" element={<CheckoutPage />} />
    </Routes>
   
  )
}

export default App
