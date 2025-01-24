import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="Footer-container">
      <p className="Footer-text">
        &copy; {new Date().getFullYear()} Food Delivery App. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
