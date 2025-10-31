import React from "react";
import "./App.css";
import "./header.css";
import "./banner.css";
import "./productCard.css";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";

// Import a product image (use one of your existing images for now)
import productImage from "./assets/bnr1.JPG";

const App = () => {
  return (
    <>
      <Header />

      <main>
        <Banner />

        <div className="products-container">
          <ProductCard 
            image={productImage}
            name="Product Name Here"
            price="99.99"
            originalPrice="149.99"
            discount="30"
          />
          
          <ProductCard 
            image={productImage}
            name="Another Product"
            price="49.99"
          />
          
          <ProductCard 
            image={productImage}
            name="Third Product"
            price="79.99"
            originalPrice="99.99"
            discount="20"
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;