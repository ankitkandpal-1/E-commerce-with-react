import { Link } from 'react-router';
import './header.css';
import './Orders.css';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';
import { formatmoney } from '../utiles/money';


export function Orders({ cart }) {

    const [orders, setorders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((response) => {
                setorders(response.data)
            })
    }, []);

    return (
        <>
            <title>Orders</title>

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
                        <div className="cart-quantity">{cart.length}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">

                    {orders.map((order) => {
                        return (
                            <div key={order.id} className="order-container">

                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatmoney(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <div className="order-details-grid">
                                    {order.products.map((Orderproduct) => {
                                        return (
                                            <Fragment key={Orderproduct.id}>
                                                <div className="product-image-container">
                                                    <img src={Orderproduct.product.image} />
                                                </div>

                                                <div className="product-details">
                                                    <div className="product-name">
                                                        {Orderproduct.product.name}
                                                    </div>
                                                    <div className="product-delivery-date">
                                                        Arriving on: {dayjs(Orderproduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                                    </div>
                                                    <div className="product-quantity">
                                                        Quantity: {Orderproduct.quantity}
                                                    </div>
                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                        <span className="buy-again-message">Add to Cart</span>
                                                    </button>
                                                </div>

                                                <div className="product-actions">
                                                    <Link to="/Tracking">
                                                        <button className="track-package-button button-secondary">
                                                            Track package
                                                        </button>
                                                    </Link>
                                                </div>
                                            </Fragment>
                                        );
                                    })}
                                    
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </>
    );
}