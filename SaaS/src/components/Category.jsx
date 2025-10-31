import React from "react";
import "../category.css";

const Category = ({ image, name }) => {
  return (
    <div className="category-card">
      <div className="category-image">
        <img src={image} alt={name} />
      </div>
      <h3 className="category-name">{name}</h3>
    </div>
  );
};

export default Category;
