import React, { useState } from "react";
import "../banner.css";

import bnr1 from "../assets/bnr1.JPG";
import bnr2 from "../assets/bnr2.JPG";
import bnr3 from "../assets/bnr3.JPG";

const Banner = () => {
  const images = [bnr1, bnr2, bnr3];
  const [currentIndex, setCurrentIndex] = useState(1);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const leftIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const rightIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="banner-container">
      {/* Desktop View */}
      <div className="desktop-view">
        <div className="side-image">
          <img src={images[leftIndex]} alt="Left" />
        </div>
        <div className="center-container">
          <img src={images[currentIndex]} alt="Center" />
          <button className="nav-btn btn-prev" onClick={prevImage}>
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="nav-btn btn-next" onClick={nextImage}>
            <svg viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div className="side-image">
          <img src={images[rightIndex]} alt="Right" />
        </div>
      </div>

      {/* Mobile View */}
      <div className="mobile-view">
        <img src={images[currentIndex]} alt="Current" />
        <button className="nav-btn btn-prev" onClick={prevImage}>
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="nav-btn btn-next" onClick={nextImage}>
          <svg viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <div className="indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToImage(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
