import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Restaurants.css"; // Updated CSS file
import Chef from "./images/chef.png";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants`);
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRestaurants(
      restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.location.toLowerCase().includes(query) ||
        restaurant.cuisine.some((cuisine) => cuisine.toLowerCase().includes(query))
      )
    );
  };

  const viewDetails = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="restaurants-container">
      <img src={Chef} className="restaurants-images" alt="Chef preparing food" /> {/* Added alt prop */}
      <div className="restaurants-content">
        <h1 className="title">Discover Restaurants</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {filteredRestaurants.length === 0 ? (
          <p className="no-results">No restaurants found.</p>
        ) : (
          <div className="restaurant-grid">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant._id} className="restaurant-card">
                {restaurant.menu && restaurant.menu.length > 0 && restaurant.menu[0].img && (
                  <img
                    src={restaurant.img}
                    alt="Menu Item"
                    className="restaurant-image"
                  />
                )}
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-location">{restaurant.location}</p>
                  <p className="restaurant-cuisine">{restaurant.cuisine.join(", ")}</p>
                  <button
                    onClick={() => viewDetails(restaurant._id)}
                    className="details-button"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
