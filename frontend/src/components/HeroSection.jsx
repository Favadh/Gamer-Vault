import React from "react";
import "./IndexPage.css";

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="overlay">
        <h1>Epic Accounts Tailored for True Gamers!</h1>
        <p>Level Up Your Gaming</p>
      </div>

      <img src="/hero-banner.png" alt="Hero" className="hero-img" />

    </div>
  );
};

export default HeroSection;
