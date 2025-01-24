import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css"; // Importing the CSS file

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!item) {
    return (
      <div className="Checkout-invalid">
        <p>Invalid order details. Please go back to the menu and try again.</p>
        <button
          onClick={() => navigate("/restaurants")}
          className="Checkout-backButton"
        >
          Back to Restaurants
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!address || !mobileNumber || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/orders", {
        state: {
          orderDetails: {
            item,
            quantity,
            address,
            mobileNumber,
            email,
          },
        },
      });
    }, 2000); // Simulating an API call with a timeout
  };

  return (
    <div className="Checkout-container">
      <h1 className="Checkout-title">Order Summary</h1>
      <div className="Checkout-content">
        <div className="Checkout-imageContainer">
          {item.img && (
            <img
              src={item.img}
              alt={item.name}
              className="Checkout-image"
            />
          )}
        </div>

        <div className="Checkout-form">
          <p className="Checkout-item"><strong>Item:</strong> {item.name}</p>
          <p className="Checkout-price"><strong>Price:</strong> ₹ {item.price.toFixed(2)}</p>

          <div className="Checkout-inputGroup">
            <label className="Checkout-label">
              <strong>Quantity:</strong>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                min="1"
                className="Checkout-input Checkout-quantity"
              />
            </label>
          </div>

          <div className="Checkout-inputGroup">
            <label className="Checkout-label">
              <strong>Address:</strong>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
                className="Checkout-input Checkout-textarea"
              />
            </label>
          </div>

          <div className="Checkout-inputGroup">
            <label className="Checkout-label">
              <strong>Mobile Number:</strong>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="Checkout-input"
              />
            </label>
          </div>

          <div className="Checkout-inputGroup">
            <label className="Checkout-label">
              <strong>Email:</strong>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="Checkout-input"
              />
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="Checkout-placeOrderButton"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
