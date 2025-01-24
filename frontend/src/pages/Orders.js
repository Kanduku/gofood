import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Orders.css"; // Importing the CSS file

const Orders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <div className="Orders-invalid">
        <p>No order details found. Please place an order first.</p>
        <button
          onClick={() => navigate("/restaurants")}
          className="Orders-backButton"
        >
          Back to Restaurants
        </button>
      </div>
    );
  }

  const { item, quantity, address, mobileNumber, email } = orderDetails;

  return (
    <div className="Orders-container">
      <h1 className="Orders-title">Your Order Details</h1>

      <div className="Orders-summary">
        <p className="Orders-detail"><strong>Item:</strong> {item.name}</p>
        <p className="Orders-detail"><strong>Quantity:</strong> {quantity}</p>
        <p className="Orders-detail">
          <strong>Total Price:</strong> ₹ {(item.price * quantity).toFixed(2)}
        </p>
        <p className="Orders-detail"><strong>Address:</strong> {address}</p>
        <p className="Orders-detail">
          <strong>Mobile Number:</strong> {mobileNumber}
        </p>
        <p className="Orders-detail"><strong>Email:</strong> {email}</p>
      </div>

      <h2 className="Orders-successMessage">
        Your order has been successfully placed!
      </h2>

      <button
        onClick={() => navigate("/restaurants")}
        className="Orders-backButton"
      >
        Back to Restaurants
      </button>
    </div>
  );
};

export default Orders;
