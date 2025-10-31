
import React from "react";
import "../productCard.css";
import cartIcon from "../assets/shopping-cart.png";

const ProductCard = ({ 
  image, 
  name, 
  price, 
  originalPrice, 
  discount 
}) => {
  return (
    <div className="product-card">
      {/* Discount Badge */}
      {discount && (
        <div className="discount-badge">-{discount}%</div>
      )}

      {/* Product Image */}
      <div className="product-image">
        <img src={image} alt={name} />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        
        <div className="price-container">
          {originalPrice && (
            <span className="original-price">${originalPrice}</span>
          )}
          <span className="current-price">${price}</span>
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn">
          <img src={cartIcon} alt="Add to cart" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;