import './Checkout-page.css';
import './checkout-header.css';
import { formatmoney } from '../utiles/money';
import axios from 'axios';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';


export function CheckoutPage({ cart , fetchAppData }) {

    const [deliveryOption, setdeliveryOption] = useState([]);

    const [paymentsummary, setpaymentsummary] = useState(null);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setdeliveryOption(response.data);
            }),
            axios.get('/api/payment-summary').then((response) => {
                setpaymentsummary(response.data);

            })
    }, [cart]);

    return (
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">3 items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOption.length > 0 && cart.map((cartItem) => {

                            const optionForItem = deliveryOption.find((deliveryOption) => {
                                return deliveryOption.id === cartItem.deliveryOptionId;
                            })
                            const deleteCartItem = async () => {
                                axios.delete(`/api/cart-items/${cartItem.productId}`)
                                await fetchAppData();
                            }
                            return (
                                <div key={cartItem.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: {dayjs(optionForItem.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.name}
                                            </div>
                                            <div className="product-price">
                                                {formatmoney(cartItem.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>

                                            {deliveryOption.map((deliveryOption) => {
                                                let priceString = ' FREE Shipping';

                                                if (deliveryOption.priceCents > 0) {
                                                    priceString = `${formatmoney(deliveryOption.priceCents)} - Shipping`;
                                                }
                                                    const upadtedeliveryoption = async () => {
                                                        await axios.put(`/api/cart-items/${cartItem.productId}` ,  {
                                                            deliveryOptionId:deliveryOption.id
                                                        });
                                                        await fetchAppData();
                                                    }
                                                return (
                                                    <div key={deliveryOption.id} className="delivery-option"
                                                     onClick={upadtedeliveryoption}>
                                                        <input type="radio"
                                                            checked={deliveryOption.id === cartItem.deliveryOptionId}
                                                            onChange={() => {}}
                                                            className="delivery-option-input"
                                                            name={`delivery-option-1 ${cartItem.productId}`} />
                                                        <div>
                                                            <div className="delivery-option-date">
                                                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}
                                                            </div>
                                                            <div className="delivery-option-price">
                                                                {priceString}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                            );

                        })}
                    </div>


                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>
                        {paymentsummary && (
                            <>
                                <div className="payment-summary-row">
                                    <div>Items ({paymentsummary.totalItems}):</div>
                                    <div className="payment-summary-money">
                                        {formatmoney(paymentsummary.productCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">
                                        {formatmoney(paymentsummary.shippingCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">
                                        {formatmoney(paymentsummary.totalCostBeforeTaxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">
                                        {formatmoney(paymentsummary.taxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">
                                        {formatmoney(paymentsummary.totalCostCents)}
                                    </div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>

        </>
    );
}