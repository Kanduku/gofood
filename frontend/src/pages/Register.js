import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Using the same CSS file as the Login page

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        name,
        email,
        password,
      });
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="bodys">
      <div className="login-container"> {/* Reusing the login-container */}
        <div className="plogin-circlep"> {/* Reusing the login-circle */}
          <h2>Register</h2> {/* Reusing the same heading styling */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              className="input" // Reusing input class
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="input" // Reusing input class
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input" // Reusing input class
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="button" type="submit"> {/* Reusing button class */}
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
