import React from 'react'
import '../CSS_Files/ResumeBuilder.css'

export default function ResumeBuilder() {
  return (
    <div className="resume-builder">
    <div className="content">
      <img
        // src="https://via.placeholder.com/300"
        src="	https://res.cloudinary.com/dmuecdqxy/image/upload/v1722778069/mftxy41vfzazrnod25bn.jpg"
        alt="Resume Builder"
        className="builder-image"
      />
      <div className="description">
        <h2>RESUME BUILDER</h2>
        <p>
          Transform your job application with our intuitive Resume Builder. Choose from a diverse variety of templates
          tailored to various industries and styles. Simply input your information, and watch as your resume takes shape,
          showcasing your skills and experiences effectively. Whether you're a fresh graduate or an experienced professional,
          our platform caters to your needs, helping you stand out in a competitive job market. Don't leave your career to chance;
          start crafting a compelling resume that captures attention and opens doors today! Elevate your job prospects with
          ease and confidence.
        </p>
        <button className="appointment-btn">SCHEDULE APPOINTMENT</button>
      </div>
    </div>
    <div className="contact-section">
      <h3>Let's talk</h3>
      <p>We would love to hear from you!</p>
      <button className="contact-btn">GET IN TOUCH</button>
    </div>
  </div>
);
}
  

