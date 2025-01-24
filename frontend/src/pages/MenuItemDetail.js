import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuItemDetail.css";

const MenuItemDetail = ({ item, email, onBack }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Navigate to the checkout page with item and email details passed in state
    navigate("/checkout", { state: { item, email } });
  };

  return (
    <div className="MenuItemDetail-container">
      <div className="MenuItemDetail-card">
        <h1 className="MenuItemDetail-title">{item.name}</h1>
        {item.img && (
          <img
            src={item.img}
            alt={item.name}
            className="MenuItemDetail-image"
          />
        )}
        <div className="MenuItemDetail-priceSection">
          <p className="MenuItemDetail-price">
            <strong>Price:</strong> ₹{item.price.toFixed(2)}
          </p>
          {email && (
            <p className="MenuItemDetail-email">
              <strong>User Email:</strong> {email}
            </p>
          )}
        </div>
        <div className="MenuItemDetail-buttons">
          <button className="MenuItemDetail-backButton" onClick={onBack}>
            Back to Menu
          </button>
          <button className="MenuItemDetail-buyButton"      onClick={handleBuyNow} >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
