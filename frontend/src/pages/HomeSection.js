import React from "react";
import "./HomeSection.css";
import { Link } from "react-router-dom";

const HomeSection = () => {
  return (
    <div className="home-section">
      <div className="content">
        <h1 className="home-title">Delicious & Healthy Food</h1>
        <p className="description">
          Discover the perfect balance of taste and nutrition. Our meals are crafted to make your life healthier and more active, one bite at a time.
        </p>

      </div>
    </div>
  );
};

export default HomeSection;
