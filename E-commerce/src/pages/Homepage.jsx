import { Link } from 'react-router';
import './header.css';
import './Homepage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Product } from './product';

export function Homepage({ cart , fetchAppData }) {

  const [products, setproducts] = useState([]);
  


  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setproducts(response.data);
      });
  }, []);


  let TotalQuantity = 0;
  cart.forEach((cartItem) => {
    TotalQuantity += cartItem.quantity;
  });





  return (
    <>
      <title>HomePage</title>

      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo"
              src="images/logo-white.png" />
            <img className="mobile-logo"
              src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/Orders">

            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/Checkout-page">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{TotalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="home-page">
        <div className="products-grid">

          {products.map((product) => {


            return (
              <Product key={product.id}product={product} fetchAppData={fetchAppData} />
            ); 
          })}
         
        </div>
      </div>
    </>
  );
}