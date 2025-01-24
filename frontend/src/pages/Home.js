import React, { useEffect, useRef } from "react";
import "./Home.css"; // Import the CSS file
import Dish1 from "./images/food-img-1.png";
import Dish2 from "./images/food-img-2.png";
import Dish3 from "./images/food-img-3.png";
import Dish4 from "./images/food-img-4.png";
import Footer from "../components/Footer";
import HomeSection from "./HomeSection";
import Restaurants from "./Restaurants";

const HomePage = () => {
  const rotatingElementRef = useRef(null);
  const itemRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const rotatingElement = rotatingElementRef.current;
    const items = itemRefs.map((ref) => ref.current);
  
    if (!rotatingElement || items.length === 0) return;
  
    let index = 0;
    let intervalId;
  
    // Function to start the rotation
    const rotateItems = () => {
      intervalId = setInterval(() => {
        if (!rotatingElement || items.length === 0) return;
  
        // Rotate by 90 degrees for each interval
        rotatingElement.style.transform = `rotate(-${index * 90}deg)`;
  
        // Remove highlighted class from all items
        items.forEach((item) => item.classList.remove("highlighted"));
  
        // Add the highlighted class to the current item
        items[index].classList.add("highlighted");
  
        // Increment index and loop back to the start if needed
        index = (index + 1) % items.length;
      }, 4000); // 4 seconds per rotation for a smoother feel
    };
  
    rotateItems(); // Start the rotation on mount
  
    return () => {
      clearInterval(intervalId); // Cleanup interval on unmount
    };
  }, [itemRefs]); // Added itemRefs to the dependency array

  return (
    <div className="bg-image">
      <h6>.</h6>
      <div className="yufood-slideshow">
        <div className="yucarousel-container" ref={rotatingElementRef}>
          <div className="rote highlighted" ref={itemRefs[0]}>
            <img src={Dish1} alt="Dish 1" />
          </div>
          <div className="rote" ref={itemRefs[1]}>
            <img src={Dish2} alt="Dish 2" />
          </div>
          <div className="rote" ref={itemRefs[2]}>
            <img src={Dish3} alt="Dish 3" />
          </div>
          <div className="rote" ref={itemRefs[3]}>
            <img src={Dish4} alt="Dish 4" />
          </div>
        </div>
      </div>
      <HomeSection />
      <Restaurants />
      <Footer />
    </div>
  );
};

export default HomePage;
