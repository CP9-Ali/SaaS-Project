import React from "react";
import "../cartPage.css";
import Header from "./Header";
import Footer from "./Footer";
import productImage from "../assets/products/car1.JPG";

const CartPage = ({ cartItems, onBack, onUpdateQuantity, onRemoveItem }) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = cartItems.length > 0 ? 0 : 0; // Free shipping
    return (subtotal + shipping).toFixed(2);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <>
      <Header onCartClick={onBack} cartCount={cartItems.length} />
      
      <div className="cart-page">
        <div className="cart-page-container">
          <button className="back-btn" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Continue Shopping
          </button>

          <h1 className="cart-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add some products to get started!</p>
              <button className="continue-shopping-btn" onClick={onBack}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-content">
              {/* Cart Items */}
              <div className="cart-items-section">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={productImage} alt={item.name} />
                      {item.discount && (
                        <div className="cart-discount-badge">-{item.discount}%</div>
                      )}
                    </div>

                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <div className="cart-item-price-section">
                        {item.originalPrice && (
                          <span className="cart-original-price">${item.originalPrice}</span>
                        )}
                        <span className="cart-current-price">${item.price}</span>
                      </div>
                      {item.discount && (
                        <span className="cart-savings-badge">
                          Save ${(parseFloat(item.originalPrice) - parseFloat(item.price)).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="cart-item-quantity">
                      <label>Quantity:</label>
                      <div className="cart-quantity-controls">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="cart-quantity-display">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      <span className="cart-item-total-label">Total:</span>
                      <span className="cart-item-total-price">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button 
                      className="cart-remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove item"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="cart-summary-section">
                <div className="cart-summary">
                  <h2>Order Summary</h2>
                  
                  <div className="summary-row">
                    <span>Subtotal ({cartItems.length} items):</span>
                    <span>${calculateSubtotal()}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span className="free-shipping">FREE</span>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-row summary-total">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>

                  <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>

                  <div className="payment-secure">
                    <span className="secure-icon">🔒</span>
                    <span>Secure Checkout</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="cart-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>30-day return policy</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;