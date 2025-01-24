import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chef1 from "./images/food-img-1.png";
import Chef2 from "./images/food-img-2.png";
import Chef3 from "./images/food-img-3.png";
import Chef4 from "./images/food-img-4.png";

import "./login.css";

const Login = ({ setIsLoggedIn, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { email, password }
      );
      const { userId, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setIsLoggedIn(true);
      if (onLogin) onLogin(email);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    // Carousel rotation logic
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".slide");
    let i = 0;
    const intervalId = setInterval(() => {
      carousel.style.transform = `rotate(${++i * 1}deg)`;
      const activeSlide = document.querySelector(".slide.active");
      if (activeSlide) activeSlide.classList.remove("active");
      slides[i % slides.length].classList.add("active");
    }, 50);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="bodys">
      <div className="login-container">
        <div className="slideshow">
          <div className="carousel">
            <div className="slide active">
              <img src={Chef1} alt="Food 1" />
            </div>
            <div className="slide">
              <img src={Chef2} alt="Food 2" />
            </div>
            <div className="slide">
              <img src={Chef3} alt="Food 3" />
            </div>
            <div className="slide">
              <img src={Chef4} alt="Food 4" />
            </div>
            <div className="slide">
              <img src={Chef1} alt="Food 1" />
            </div>
            <div className="slide">
              <img src={Chef2} alt="Food 2" />
            </div>
            <div className="slide">
              <img src={Chef3} alt="Food 3" />
            </div>
            <div className="slide">
              <img src={Chef4} alt="Food 4" />
            </div>
          </div>
        </div>
        <div className="plogin-circlep">
          <h1>Login</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
            className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
            className="input"  
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="button" type="submit">Go</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
