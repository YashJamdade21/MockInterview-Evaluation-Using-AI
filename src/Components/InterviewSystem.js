// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Alert } from 'react-bootstrap';
// import '../CSS_Files/InterviewSystem.css';

// const InterviewSystem = () => {
//   const [file, setFile] = useState(null);
//   const [jobRole, setJobRole] = useState('');
//   const [summary, setSummary] = useState('');
//   const [error, setError] = useState(null);

//   const handleFileUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleJobRoleChange = (e) => {
//     setJobRole(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('jobRole', jobRole);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSummary(response.data.summary);
//       setError(null);
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred while processing your request.');
//     }
//   };

//   return (
//     <div className="interview-system">
//       <h1>Interview System</h1>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group>
//           <Form.Label>Resume File</Form.Label>
//           <Form.Control type="file" onChange={handleFileUpload} />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Job Role</Form.Label>
//           <Form.Control type="text" value={jobRole} onChange={handleJobRoleChange} placeholder="Job Role" />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Start Interview
//         </Button>
//       </Form>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {summary && (
//         <div className="summary-container">
//           <h2>Interview Summary</h2>
//           <pre>{summary}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewSystem;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Alert } from 'react-bootstrap';
// import '../CSS_Files/InterviewSystem.css';
// // import './InterviewSystem.css';

// const InterviewSystem = () => {
//   const [file, setFile] = useState(null);
//   const [jobRole, setJobRole] = useState('');
//   const [summary, setSummary] = useState('');
//   const [error, setError] = useState(null);

//   const handleFileUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleJobRoleChange = (e) => {
//     setJobRole(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('jobRole', jobRole);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSummary(response.data.summary);
//       setError(null);
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred while processing your request.');
//     }
//   };

//   return (
//     <div className="interview-system">
//       <header className="App-header" >
//         <h1>Interview System App</h1>
//       </header>
//       <main className="App-main">
//         <div className="container">
//           <div className="row">
//             <div className="form col-md-6 offset-md-3">
//               <Form onSubmit={handleSubmit} >
//                 <Form.Group className="form-inner">
//                   <Form.Label >Resume File</Form.Label>
//                   <Form.Control type="file" onChange={handleFileUpload} />
//                 </Form.Group>
//                 <Form.Group className="form-inner">
//                   <Form.Label >Job Role</Form.Label>
//                   <Form.Control type="text" value={jobRole} onChange={handleJobRoleChange} placeholder="Job Role" />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="button">
//                   Start Interview
//                 </Button>
//               </Form>
//             </div>
//           </div>
//         </div>

//         {error && <Alert variant="danger">{error}</Alert>}

//         {summary && (
//           <div className="summary-container">
//             <h2>Interview Summary</h2>
//             <pre>{summary}</pre>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default InterviewSystem;









// 

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate to programmatically navigate
import '../CSS_Files/InterviewSystem.css';

const InterviewSystem = () => {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleJobRoleChange = (e) => {
    setJobRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobRole', jobRole);
  
    try {
      // const response = await axios.post('/api/upload', formData, {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSummary(response.data.summary);
      setError(null);
  
      // Navigate to MockInterview page after successful file submission
      // navigate('/mock-interview');
      navigate('/mock-interview', { state: { jobRole: jobRole } });

  
    } catch (error) {
      console.error(error);
      setError('An error occurred while processing your request.');
    }
  };
  

  return (
    <div className="interview-system">
      <header className="App-header">
        <h1>Interview System App</h1>
      </header>
      <main className="App-main">
        <div className="container">
          <div className="row">
            <div className="form-container col-md-6 offset-md-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-inner">
                  <Form.Label>Resume File</Form.Label>
                  <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>
                <Form.Group className="form-inner">
                  <Form.Label>Job Role</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={jobRole} 
                    onChange={handleJobRoleChange} 
                    placeholder="Job Role" 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="button">
                  Start Interview
                </Button>
              </Form>
            </div>
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {summary && (
          <div className="summary-container">
            <h2>Interview Summary</h2>
            <pre>{summary}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default InterviewSystem;
