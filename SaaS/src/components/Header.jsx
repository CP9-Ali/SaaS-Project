import React, { useState, useEffect, useRef } from "react";
import "../header.css";
import storeIcon from "../assets/store.png";
import searchIcon from "../assets/search-interface-symbol.png";
import languageIcon from "../assets/language.png";
import categoriesIcon from "../assets/categories.png";
import cartIcon from "../assets/shopping-cart.png";

const Header = () => {
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const overlayRef = useRef(null);
  const iconRef = useRef(null);

  const toggleMobileSearch = (e) => {
    e.stopPropagation(); // prevent closing immediately
    setMobileSearchActive((prev) => !prev);
  };

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
      <header>
        {/* Logo */}
        <div className="logo">
          <img src={storeIcon} alt="Logo" />
          <h1>محلي</h1>
        </div>

        {/* Desktop search bar */}
        <div className="search-bar">
          <div className="input-wrapper">
            <input type="text" placeholder="Search..." />
            <img src={searchIcon} alt="Search" className="search-icon" />
          </div>
        </div>

        {/* Mobile search icon */}
        <div
          className="mobile-search-icon"
          onClick={toggleMobileSearch}
          ref={iconRef}
        >
          <img src={searchIcon} alt="Search" />
        </div>

        {/* Navigation icons */}
        <div className="nav-icons">
          <img src={languageIcon} alt="Language" />
          <img src={categoriesIcon} alt="Categories" />
          <img src={cartIcon} alt="Cart" />
        </div>
      </header>

      {/* Mobile Search Overlay */}
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
