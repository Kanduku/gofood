import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MenuItemDetail from "./MenuItemDetail";
import "./RestaurantDetail.css";
// import Eeh from "../images/lchef.png";
import Eeh from "./images/lchef.png"

const RestaurantDetail = () => {
  const { id } = useParams(); // Get the restaurant id from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // State for the selected menu item
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${id}`);
        setRestaurant(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching restaurant details:", err);
        setError("Failed to load restaurant details. Please try again.");
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchRestaurantDetails();
  }, [id]); // Re-run the effect when id changes

  if (loading) {
    return <p className="restaurant-detail-loading">Loading restaurant details...</p>;
  }

  if (error) {
    return <p className="restaurant-detail-error">{error}</p>;
  }

  if (selectedMenuItem) {
    // Render the detailed view if a menu item is selected
    return <MenuItemDetail item={selectedMenuItem} onBack={() => setSelectedMenuItem(null)} />;
  }

  return (<div>
    
          <img src={Eeh} className="restaurant-detail-images"></img>

    <div className="restaurant-detail-container">
      <header className="restaurant-detail-header">
        <h1 className="restaurant-detail-name">{restaurant.name}</h1>
        <p className="restaurant-detail-location">{restaurant.location}</p>
      </header>
      <img
        src={restaurant.img}
        alt={restaurant.name}
        className="restaurant-detail-banner"
      />
      <section className="restaurant-detail-cuisine">
        <p><strong>Cuisine:</strong> {restaurant.cuisine.join(", ")}</p>
      </section>

      <h3 className="restaurant-detail-menu-title">Our Menu</h3>
      <div className="restaurant-detail-menu-cards">
        {restaurant.menu.length > 0 ? (
          restaurant.menu.map((item, index) => (
            <div
              key={index}
              className="menu-card"
              onClick={() => setSelectedMenuItem(item)}
            >
              <img
                src={item.img || "https://via.placeholder.com/150"}
                alt={item.name}
                className="menu-card-image"
              />
              <div className="menu-card-content">
                <h4 className="menu-card-title">{item.name}</h4>
              
                <p className="menu-card-price">₹ {item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="restaurant-detail-no-menu">No menu items available.</p>
        )}
      </div>

      <button className="restaurant-detail-back-button" onClick={() => navigate("/restaurants")}>
        Back to Restaurants
      </button>
    </div>
    </div>
  );
};

export default RestaurantDetail;
