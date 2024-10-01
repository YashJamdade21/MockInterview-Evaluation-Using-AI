import React, { useState } from 'react';
import axios from 'axios';
import '../CSS_Files/MockInterview.css';
import { useLocation } from 'react-router-dom';

const MockInterview = () => {
  const location = useLocation();
  const jobRole = location.state?.jobRole || 'default role';
  const [uploadedFilePath, setUploadedFilePath] = useState('');
  const [sessionId, setSessionId] = useState(null);  // Define sessionId state
  const [conversation, setConversation] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [aiResponse, setAiResponse] = useState('');


  const handleUserSpeak = async () => {
    try {
        setIsListening(true);
        const userResponse = await axios.post('http://127.0.0.1:5000/api/listen_user');  // Ensure URL is correct
        const userMessage = userResponse.data.transcription;
        setConversation(prev => [...prev, { sender: 'User', message: userMessage }]);

        const aiResponse = await axios.post('http://127.0.0.1:5000/api/ai_response', { userMessage });  // Assuming /api/ai_response is implemented
        setConversation(prev => [...prev, { sender: 'AI', message: aiResponse.data.answer }]);

        setIsListening(false);
    } catch (error) {
        console.error("Error during user response: ", error);
        setIsListening(false);
    }
};

  const handleStartInterview = async () => {
    if (!uploadedFilePath) {
      console.error("File path is missing. Please upload the resume.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/start_interview', {
        jobRole,
        file_path: uploadedFilePath
      });
      const { question, session_id } = response.data;
      setConversation(prev => [...prev, { sender: 'AI', message: question }]);
      setSessionId(session_id);  // Save session_id for later use
    } catch (error) {
      console.error("Error starting interview: ", error.response?.data || error.message || error);
    }
  };

  const submitResponse = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/generate_question', {
        user_input: userResponse,
        session_id: sessionId  // Pass session_id from start_interview
      });
      if (response.status === 200 && response.data.ai_response) {
        const aiText = response.data.ai_response;
        setConversation(prev => [...prev, { sender: 'User', message: userResponse }]);
        setConversation(prev => [...prev, { sender: 'AI', message: aiText }]);
        setAiResponse(aiText);
        setUserResponse('');
        speakText(aiText);
      } else {
        console.error("Unexpected response structure:", response);
        setAiResponse("Sorry, there was an issue processing your request.");
      }
    } catch (error) {
      console.error("Error while generating AI question:", error.response?.data || error.message || error);
      setAiResponse("Sorry, there was an error connecting to the server.");
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      window.speechSynthesis.speak(speech);
    } else {
      console.log('Speech Synthesis is not supported in this browser.');
    }
  };

  // const handleUserSpeak = async () => {
  //   try {
  //     setIsListening(true);
  //     const userResponse = await axios.post('http://127.0.0.1:5000/api/listen_user');
  //     const userMessage = userResponse.data.transcription;
  //     setConversation(prev => [...prev, { sender: 'User', message: userMessage }]);

  //     const aiResponse = await axios.post('http://127.0.0.1:5000/api/ai_response', { userMessage });
  //     setConversation(prev => [...prev, { sender: 'AI', message: aiResponse.data.answer }]);

  //     setIsListening(false);
  //   } catch (error) {
  //     console.error("Error during user response: ", error);
  //     setIsListening(false);
  //   }
  // };

  const handleFileUpload = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('file', file);
    formData.append('jobRole', jobRole);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 && response.data.message) {
        const filePath = response.data.file_path;
        setUploadedFilePath(filePath);  // Save the file path in state
        console.log('File uploaded successfully:', filePath);
      } else {
        console.error('Unexpected response from server during file upload:', response);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="mock-interview">
      <h2>Mock Interview for {jobRole}</h2>
      
      <div className="conversation-container">
        {conversation.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender === 'AI' ? 'left' : 'right'}`}>
            <strong>{chat.sender}:</strong> {chat.message}
          </div>
        ))}
      </div>

      <input type="file" onChange={handleFileUpload} />
      
      <input
        type="text"
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
        placeholder="Type your response here..."
      />
      <button onClick={submitResponse}>Submit Response</button>

      <button onClick={handleUserSpeak} disabled={isListening}>
        {isListening ? "Listening..." : "Speak to AI"}
      </button>

      {conversation.length === 0 && (
        <button onClick={handleStartInterview}>Start Interview</button>
      )}

      <div>
        <strong>AI:</strong> {aiResponse}
      </div>
    </div>
  );
};

export default MockInterview;
