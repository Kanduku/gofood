import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import Orders from "./pages/Orders";
import MenuItemDetail from "./pages/MenuItemDetail";
// MenuItemDetail Component
import Checkout from "./pages/Checkout";

import Navbar from "./components/Navbar";

import Dmin from "./pages/Dmin";
import "./App.css"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Check if a token exists and update the login state
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setIsLoggedIn(false); // Update the login state
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
      <Route
          path="/checkout"
          element={
            isLoggedIn ? <Checkout /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/orders"
          element={
            isLoggedIn ? <Orders /> : <Navigate to="/login" />
          }
        />
    

        <Route path="/restaurants/:id/menu/:menuItemId" element={<MenuItemDetail />} />
        {/* Redirect to Home or Login based on authentication */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/login" />
          }
        />
        {/* Login route */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        {/* Register route */}
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Register />
          }
        />
        {/* Restaurants route */}
        <Route
          path="/restaurants"
          element={
            isLoggedIn ? <Restaurants /> : <Navigate to="/login" />
          }
        />
        {/* Restaurant details route */}
        <Route
          path="/restaurants/:id"
          element={
            isLoggedIn ? <RestaurantDetail /> : <Navigate to="/login" />
          }
        />
          {/* Restaurant details route */}
          <Route
          path="/admin"
          element={
            isLoggedIn ? <Dmin /> : <Navigate to="/login" />
          }
        />
         
               
        {/* Catch-all route for invalid paths */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />

      </Routes>
      
    </Router>
  );
}

export default App;
