import React, { useState, useEffect, useRef } from "react";
import "../header.css";
import storeIcon from "../assets/store.png";
import searchIcon from "../assets/search-interface-symbol.png";
import languageIcon from "../assets/language.png";
import categoriesIcon from "../assets/categories.png";
import cartIcon from "../assets/shopping-cart.png";

const Header = ({ onCartClick, cartCount = 0 }) => {
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const overlayRef = useRef(null);
  const iconRef = useRef(null);

  const toggleMobileSearch = (e) => {
    e.stopPropagation();
    setMobileSearchActive((prev) => !prev);
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileSearchActive(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close when clicking outside overlay + icon
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target) &&
        !iconRef.current.contains(e.target)
      ) {
        setMobileSearchActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <header style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        
        <div className="logo">
          <a href="App.jsx"><img src={storeIcon} alt="Logo" /></a>
          <a href="App.jsx">محلي</a>
        </div>

        <div className="search-bar">
          <div className="input-wrapper">
            <input type="text" placeholder="Search..." />
            <img src={searchIcon} alt="Search" className="search-icon" />
          </div>
        </div>

        <div
          className="mobile-search-icon"
          onClick={toggleMobileSearch}
          ref={iconRef}
        >
          <img src={searchIcon} alt="Search" />
        </div>

        <div className="nav-icons">
          <img id="Language-icon" src={languageIcon} alt="Language" />
          <img id="Categories-icon" src={categoriesIcon} alt="Categories" />
          <div className="cart-icon-wrapper" onClick={handleCartClick}>
            <img id="Cart-icon" src={cartIcon} alt="Cart" />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>
        </div>
      </header>

      {mobileSearchActive && (
        <div
          className="mobile-search-overlay active"
          id="mobile-search-overlay"
          ref={overlayRef}
        >
          <div className="input-wrapper">
            <input type="text" placeholder="Search..." autoFocus />
            <img src={searchIcon} alt="Search" className="search-icon" />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;