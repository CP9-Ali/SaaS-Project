import React, { useState } from "react";
import "../productPage.css";
import Header from "./Header";
import Footer from "./Footer";
import cartIcon from "../assets/shopping-cart.png";
import productImage from "../assets/products/car1.JPG";

const ProductPage = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [productImage, productImage, productImage, productImage];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <>
      <Header />
      
      <div className="product-page">
        <div className="product-page-container">
          <button className="back-btn" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Shop
          </button>

          <div className="product-detail-grid">
            <div className="product-images-section">
              <div className="main-image-container">
                {product.discount && (
                  <div className="discount-badge-large">-{product.discount}%</div>
                )}
                <img src={images[selectedImage]} alt={product.name} className="main-product-image" />
              </div>

              <div className="thumbnail-gallery">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`View ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="product-details-section">
              <h1 className="product-title">{product.name}</h1>
              
              <div className="price-section">
                {product.originalPrice && (
                  <span className="original-price-large">${product.originalPrice}</span>
                )}
                <span className="current-price-large">${product.price}</span>
                {product.discount && (
                  <span className="savings">You save ${(parseFloat(product.originalPrice) - parseFloat(product.price)).toFixed(2)}</span>
                )}
              </div>

              <div className="availability">
                <span className="in-stock">✓ In Stock</span>
                <span className="shipping">Free Shipping Available</span>
              </div>

              <div className="product-description">
                <h3>Product Description</h3>
                <p>
                  Experience premium quality with this exceptional product. Crafted with attention to detail 
                  and designed for modern lifestyles, this item combines functionality with elegant aesthetics.
                </p>
                <ul>
                  <li>High-quality materials and construction</li>
                  <li>Modern and stylish design</li>
                  <li>Durable and long-lasting</li>
                  <li>Perfect for everyday use</li>
                  <li>30-day money-back guarantee</li>
                </ul>
              </div>

              <div className="product-specs">
                <h3>Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Brand:</span>
                    <span className="spec-value">Premium Brand</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Material:</span>
                    <span className="spec-value">High Quality</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Warranty:</span>
                    <span className="spec-value">1 Year</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Origin:</span>
                    <span className="spec-value">International</span>
                  </div>
                </div>
              </div>

              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(-1)}>−</button>
                  <span className="quantity-display">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>

              <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
                <img src={cartIcon} alt="Cart" />
                Add to Cart - ${(parseFloat(product.price) * quantity).toFixed(2)}
              </button>

              <div className="additional-info">
                <div className="info-item">
                  <span className="icon">🚚</span>
                  <div>
                    <strong>Fast Delivery</strong>
                    <p>2-5 business days shipping</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="icon">↩️</span>
                  <div>
                    <strong>Easy Returns</strong>
                    <p>30-day return policy</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="icon">🔒</span>
                  <div>
                    <strong>Secure Payment</strong>
                    <p>100% secure transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;