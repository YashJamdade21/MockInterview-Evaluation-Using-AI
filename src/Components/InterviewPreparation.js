import React from 'react'
import '../CSS_Files/InterviewPreparation.css'
import { useNavigate } from 'react-router-dom'

export default function InterviewPreparation() {
  const navigate = useNavigate();

  const handleScheduleAppointment = () => {
      navigate('/interview-system');
  };
  return (
    <div>
      <div className="interview-preparation">
      <div className="content">
        <img
          src=	"https://res.cloudinary.com/dmuecdqxy/image/upload/v1722778069/mftxy41vfzazrnod25bn.jpg"
          alt="Interview Preparation"
          className="preparation-image"
        />
        <div className="description">
          <h2>INTERVIEW PREPARATION</h2>
          <p>
            Step into your next interview with confidence using our Interview Preparation feature. Engage in realistic mock interviews powered by AI technology designed to simulate real-life scenarios. Our platform will guide you through common interview questions and provide constructive feedback on your answers, body language, and presentation. This interactive experience equips you with the skills to articulate your thoughts clearly and impress interviewers. Whether you're preparing for your first job or looking to advance your career, our interview preparation tools will help you shine and leave a lasting impression. Don’t just prepare; excel in your interviews!
          </p>
          <button className="appointment-btn" onClick={handleScheduleAppointment}>
                SCHEDULE APPOINTMENT
            </button>
        </div>
      </div>
      <div className="contact-section">
        <h3>Let's talk</h3>
        <p>We would love to hear from you!</p>
        <button className="contact-btn">GET IN TOUCH</button>
      </div>
    </div>
    </div>
  )
}
