import React, { useState } from "react";
import "./App.css";
import "./header.css";
import "./banner.css";
import "./productCard.css";
import "./category.css";
import "./productPage.css";
import "./cartPage.css";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import Category from "./components/Category";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";

// Import product image
import productImage from "./assets/products/car1.JPG";

// Import category images
import shoesImg from "./assets/Categories/shoes.png";
import bagImg from "./assets/Categories/bag.png";
import watchesImg from "./assets/Categories/watches.png";
import accessoriesImg from "./assets/Categories/accessories.png";
import perfumeImg from "./assets/Categories/perfume.png";
import clothesImg from "./assets/Categories/clothes.png";

const App = () => {
  const allProducts = [
    { id: 1, name: "Product 1", price: "99.99", originalPrice: "149.99", discount: "30" },
    { id: 2, name: "Product 2", price: "49.99" },
    { id: 3, name: "Product 3", price: "79.99", originalPrice: "99.99", discount: "20" },
    { id: 4, name: "Product 4", price: "59.99" },
    { id: 5, name: "Product 5", price: "89.99", originalPrice: "119.99", discount: "25" },
    { id: 6, name: "Product 6", price: "39.99" },
    { id: 7, name: "Product 7", price: "69.99" },
    { id: 8, name: "Product 8", price: "54.99", originalPrice: "74.99", discount: "27" },
    { id: 9, name: "Product 9", price: "44.99" },
    { id: 10, name: "Product 10", price: "94.99" },
    { id: 11, name: "Product 11", price: "64.99", originalPrice: "84.99", discount: "24" },
    { id: 12, name: "Product 12", price: "74.99" },
    { id: 13, name: "Product 13", price: "84.99" },
    { id: 14, name: "Product 14", price: "34.99" },
    { id: 15, name: "Product 15", price: "104.99", originalPrice: "139.99", discount: "25" },
    { id: 16, name: "Product 16", price: "29.99" },
  ];

  const categories = [
    { name: "Shoes", image: shoesImg },
    { name: "Bags", image: bagImg },
    { name: "Watches", image: watchesImg },
    { name: "Accessories", image: accessoriesImg },
    { name: "Perfumes", image: perfumeImg },
    { name: "Clothes", image: clothesImg },
  ];

  const itemsPerRow = 4;
  const rowsToShow = 2;
  const itemsPerLoad = itemsPerRow * rowsToShow;

  const [visibleCount, setVisibleCount] = useState(itemsPerLoad);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const loadMore = () => {
    setVisibleCount(prev => prev + itemsPerRow);
  };

  const handleProductClick = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    setSelectedProduct(product);
    setShowCart(false);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
    setShowCart(false);
    window.scrollTo(0, 0);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  // Show Cart Page
  if (showCart) {
    return (
      <CartPage
        cartItems={cartItems}
        onBack={handleBackToHome}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    );
  }

  // Show Product Page
  if (selectedProduct) {
    return (
      <ProductPage
        product={selectedProduct}
        onBack={handleBackToHome}
        onAddToCart={handleAddToCart}
      />
    );
  }

  // Show Home Page
  return (
    <>
      <Header onCartClick={handleCartClick} cartCount={cartItems.length} />

      <main>
        <Banner />

        <section className="categories-section">
          <div className="Category-container">
            {categories.map((cat, index) => (
              <Category key={index} name={cat.name} image={cat.image} />
            ))}
          </div>
        </section>

        <div className="products-container">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={productImage}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              onProductClick={handleProductClick}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {hasMore && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={loadMore}>
              Load More Products
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default App;