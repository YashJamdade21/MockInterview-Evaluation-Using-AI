// src/App.js
// import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ResumeBuilder from './Components/ResumeBuilder';
import InterviewPreparation from './Components/InterviewPreparation';
import AiFeedbackAssistant from './Components/AiFeedbackAssistant'
import Footer from './Components/Footer';
import HeroSection from './Components/HeroSection';
import ContactUs from './Components/ContactUs';
import React, { useEffect, useState } from 'react';
import InterviewSystem from './Components/InterviewSystem'; // Import your InterviewSystem component
import MockInterview from './Components/MockInterview';

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() 
  {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      fetch('http://127.0.0.1:5000/api/data')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data); // Log the data for debugging
          setData(data.message);
        })
        .catch(error => console.error('Error:', error));
    }, []);
    
  return (
    <>
     <div>
      <h1>Data from Flask</h1>
      <div>{data}</div>
    </div>
    <HeroSection/>
    <div>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/interview-preparation" element={<InterviewPreparation />} />
          <Route path="/ai-feedback-assistant" element={<AiFeedbackAssistant />} />
          <Route path="/interview-system" element={<InterviewSystem />} />
          <Route path="/mock-interview" element={<MockInterview />} />
        </Routes>
      </div>
    </Router>
    </div>
    
    <div className="app" id='features'>
    <h1 className="title ">Key Features</h1>
    <div className="features-containers">
      <div className="feature-cards">
        <div className="icon">✨</div>
        <h2>Create Stunning Resumes</h2>
        <p>Choose templates and add information.</p>
      </div>
      <div className="feature-card highlighted">
        <div className="icon">✨</div>
        <h2>Choose Dynamic Templates</h2>
        <p>Variety of templates to select.</p>
      </div>
      <div className="feature-cards">
        <div className="icon">✨</div>
        <h2>AI Feedback Assistant</h2>
        <p>Interactive feedback on your resume.</p>
      </div>
    </div>
  </div> 
  
  <div className="app2" id='about'>
      <div className="why-choose-us">
        <div className="image-container">
          {/* <img src="stacked-books.jpg" alt="Stacked books" /> */}
          <img  src="https://res.cloudinary.com/dmuecdqxy/image/upload/v1722778924/bvie57lxjrypagfqwkxa.jpg" alt="Stacked books" />
        </div>
        <div className="text-container">
          <h2>Why Choose Us?</h2>
          <p>
            At InteractiveResumeAI, we offer resume creation tools and
            AI-driven feedback for a seamless job application process.
          </p>
        </div>
      </div>
    </div>
    <div className="app3">
      <div className="highlight-advantages">
        <div className="image-container1">
          <img src="	https://res.cloudinary.com/dmuecdqxy/image/upload/v1722778924/gsdz6mhtnybramiig4fc.jpg" alt="User Highlight" />
        </div>
        <div className="text-container2">
          <h2>Highlighting Unique Advantages</h2>
          <p>
            Our platform combines top-notch resume creation with interactive AI feedback for unparalleled career growth.
          </p>
          <div className="stats">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Resumes Created</p>
            </div>
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Users Assisted</p>
            </div>
          </div>
          <button className="cta-button">Try Now</button>
        </div>
      </div>
    </div>
    <ContactUs/>
    <Footer/>
  </>
  
  );
}

function Home() {
  return (
    <div id='service'>
      <h2>Transform your job search journey</h2>
      <div className="features-container">
        <Link to="/resume-builder" className="feature-link">
          <FeatureCard
            title="Resume builder >"
            description="Create a professional resume."
            imageUrl="https://via.placeholder.com/150"
            // imageUrl="https://drive.google.com/uc?export=view&id=YOUR_IMAGE_ID/150"
            imageSrc="	https://res.cloudinary.com/dmuecdqxy/image/upload/v1722778069/mftxy41vfzazrnod25bn.jpg"
        
          />
        </Link>
        <Link to="/ai-feedback-assistant" className="feature-link">
        <FeatureCard
          title="AI Feedback Assistant >"
          description="Get instant feedback on your resume."
          // imageUrl="https://via.placeholder.com/150"
          imageSrc="	https://res.cloudinary.com/dmuecdqxy/image/upload/v1722778069/mftxy41vfzazrnod25bn.jpg"
        />
        </Link>
        <Link to="/interview-preparation" className="feature-link">
        <FeatureCard
          title="Interview preparation >"
          description="Prepare for interviews like a pro."
          // imageUrl="https://via.placeholder.com/150"
          imageSrc="	https://res.cloudinary.com/dmuecdqxy/image/upload/v1722778069/mftxy41vfzazrnod25bn.jpg"
          />
          </Link>
      </div>
    </div>
  );
}

// function FeatureCard({ title, description, imageUrl }) {
function FeatureCard({ title, description, imageSrc }) {
  return (
    <div className="feature-card">
      <img src={imageSrc} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default App;
