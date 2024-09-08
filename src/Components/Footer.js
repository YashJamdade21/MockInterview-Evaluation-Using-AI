import React from "react";
// import "./Footer.css";
import '../CSS_Files/footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>InteractiveResumeAI</h2>
          <p>Interactive tool for creating and optimizing resumes.</p>
          <div className="subscribe-container">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="footer-section links">
          <h3>Company</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Service</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Testimonial</a></li>
            <li><a href="/">Features</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact info</h3>
          <ul>
            <li>1234 Elm St, Suite 567</li>
            <li>📞 +1234567890</li>
            <li>✉️ support@interactiveresumeai.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Copyright 2024, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;