import React from 'react';
// import './HeroSection.css'; // We'll style this component in a separate CSS file.
import '../CSS_Files/heroSection.css'
import { Router } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <nav className="navbar">
        <h1>MOCK INTERVIEW EVALUATION USING AI</h1>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="hero-content">
        <h2>Ace your interview</h2>
        <p>Get the best mock interview experience</p>
        <button><a href='#service'>VIEW SERVICES</a></button>
        {/* <button >VIEW SERVICES</button> */}
      </div>
    </div>
  );
};

export default HeroSection;