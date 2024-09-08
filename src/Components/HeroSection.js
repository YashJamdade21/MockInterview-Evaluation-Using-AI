import React from 'react';
// import './HeroSection.css'; // We'll style this component in a separate CSS file.
import '../CSS_Files/heroSection.css'

const HeroSection = () => {
  return (
    <div className="hero-container">
      <nav className="navbar">
        <h1>MOCK INTERVIEW EVALUATION USING AI</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">More</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </nav>
      <div className="hero-content">
        <h2>Ace your interview</h2>
        <p>Get the best mock interview experience</p>
        <button>VIEW SERVICES</button>
      </div>
    </div>
  );
};

export default HeroSection;