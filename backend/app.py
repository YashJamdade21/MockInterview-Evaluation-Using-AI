# # from flask import Flask, jsonify, request
# # from flask_cors import CORS
# # from resume_processing import autonomous_resume_processing
# # from voice_processing import ask_question, listen_answer
# # import asyncio

# # # Initialize Flask app
# # app = Flask(__name__)
# # CORS(app ,resources={r"/api/*": {"origins": "*"}})

# # # Simple test route
# # @app.route('/api/data', methods=['GET'])
# # def get_data():
# #     data = {"message": "Hello from Flask!"}
# #     return jsonify(data)

# # # Flask backend logic
# # @app.route('/api/generate_question', methods=['POST'])
# # def generate_question():
# #     user_input = request.json.get('user_input')
# #     if user_input:
# #         # Basic AI logic or integrate with AI model like GPT to generate next question
# #         next_question = "Tell me more about your experience."
# #         return jsonify({"ai_response": next_question})
# #     else:
# #         return jsonify({"ai_response": "Sorry, I didn't understand that."})


# # @app.route('/api/upload', methods=['POST'])
# # def upload_resume():
# #     # Logic to handle the uploaded file and job role from the form data.
# #     # This might include saving the file, processing the resume, etc.
# #     file = request.files['file']
# #     job_role = request.form.get('jobRole', 'default role')
# #     # Assuming file saving and processing logic here...
# #     return jsonify({"message": "File uploaded and processed", "summary": "Resume processed successfully"})


# # # Route for processing the resume
# # @app.route('/api/process_resume', methods=['POST'])
# # def process_resume():
# #     file_path = request.json.get('file_path')
# #     job_role = request.json.get('job_role', 'data scientist')

# #     # Ensure file_path is provided
# #     if not file_path:
# #         return jsonify({"error": "File path is required."}), 400

# #     # Run the asynchronous resume processing function
# #     try:
# #         asyncio.run(autonomous_resume_processing(file_path, job_role=job_role))
# #         return jsonify({"message": "Resume processing started"})
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# # # Start the interview
# # @app.route('/api/start_interview', methods=['POST'])
# # def start_interview():
# #     job_role = request.json.get('jobRole', 'data scientist')
# #     file_path = request.json.get('file_path', 'path/to/resume.pdf')  # Dynamic path from request

# #     # Ensure file_path is provided
# #     if not file_path:
# #         return jsonify({"error": "File path is required."}), 400

# #     # Process the resume and generate questions
# #     try:
# #         resume_data = asyncio.run(autonomous_resume_processing(file_path, job_role=job_role))
# #         questions = resume_data.get('questions', [])
        
# #         first_question = questions[0] if questions else "Tell me about yourself."
        
# #         return jsonify({"question": first_question})
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# # @app.route('/api/listen_user', methods=['POST'])
# # def listen_user():
# #     try:
# #         # Call the function that listens to the user's voice and transcribes it
# #         user_response = listen_answer()  # Assuming this function transcribes the user's speech
# #         return jsonify({"transcription": user_response}), 200
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500


# # if __name__ == '__main__':
# #     app.run(debug=True)

# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from resume_processing import autonomous_resume_processing
# from voice_processing import ask_question, listen_answer
# import os

# app = Flask(__name__)
# CORS(app ,resources={r"/api/*": {"origins": "*"}})

# # In-memory session to store generated questions
# interview_sessions = {}

# @app.route('/api/generate_question', methods=['POST'])
# def generate_question():
#     user_input = request.json.get('user_input')
#     session_id = request.json.get('session_id')

#     if not session_id or session_id not in interview_sessions:
#         return jsonify({"ai_response": "Interview session not found."})

#     # Fetch the remaining questions for this session
#     questions = interview_sessions[session_id].get('questions', [])
    
#     if questions:
#         # Pop the next question
#         next_question = questions.pop(0)
#         interview_sessions[session_id]['questions'] = questions
#         return jsonify({"ai_response": next_question})
#     else:
#         return jsonify({"ai_response": "No more questions available."})

# @app.route('/api/upload', methods=['POST'])
# def upload_resume():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part."}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No selected file."}), 400

#     file_path = os.path.join('uploads', file.filename)
#     file.save(file_path)

#     job_role = request.form.get('jobRole', 'default role')
#     return jsonify({"message": "File uploaded and processed", "file_path": file_path})

# @app.route('/api/start_interview', methods=['POST'])
# def start_interview():
#     job_role = request.json.get('jobRole', 'data scientist')
#     file_path = request.json.get('file_path')  # Dynamic path from request

#     if not file_path:
#         return jsonify({"error": "File path is required."}), 400

#     # Process the resume and generate questions
#     try:
#         resume_data = autonomous_resume_processing(file_path, job_role=job_role)
#         questions = resume_data.get('questions', [])

#         if not questions:
#             return jsonify({"error": "No questions generated."}), 500

#         # Store the questions for this session
#         session_id = str(hash(file_path))  # Simple session ID
#         interview_sessions[session_id] = {"questions": questions}

#         first_question = questions.pop(0)
#         interview_sessions[session_id]['questions'] = questions
        
#         return jsonify({"question": first_question, "session_id": session_id})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     if not os.path.exists('uploads'):
#         os.makedirs('uploads')
#     app.run(debug=True)
from flask import Flask, jsonify, request
from flask_cors import CORS
from resume_processing import autonomous_resume_processing
import os
from voice_processing import listen_answer

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/listen_user', methods=['POST'])
def listen_user():
    # Call the speech-to-text function
    try:
        answer = listen_answer()
        if answer:
            return jsonify({"transcription": answer}), 200
        else:
            return jsonify({"error": "Could not understand the input."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500




# In-memory session to store generated questions
interview_sessions = {}

@app.route('/api/generate_question', methods=['POST'])
def generate_question():
    user_input = request.json.get('user_input')
    session_id = request.json.get('session_id')

    if not session_id or session_id not in interview_sessions:
        return jsonify({"ai_response": "Interview session not found. Please start the interview first."}), 400

    # Fetch the remaining questions for this session
    questions = interview_sessions[session_id].get('questions', [])

    if questions:
        # Pop the next question
        next_question = questions.pop(0)
        interview_sessions[session_id]['questions'] = questions
        return jsonify({"ai_response": next_question})
    else:
        return jsonify({"ai_response": "No more questions available."})
    
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})



@app.route('/api/upload', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file part."}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file."}), 400

    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    return jsonify({"message": "File uploaded and processed", "file_path": file_path})

@app.route('/api/start_interview', methods=['POST'])
def start_interview():
    job_role = request.json.get('jobRole', 'data scientist')
    file_path = request.json.get('file_path')  # Dynamic path from request

    if not file_path or not os.path.exists(file_path):
        return jsonify({"error": "Invalid file path or file not found."}), 400

    # Process the resume and generate questions
    try:
        resume_data = autonomous_resume_processing(file_path, job_role=job_role)
        questions = resume_data.get('questions', [])

        if not questions:
            return jsonify({"error": "No questions generated."}), 500

        # Store the questions for this session
        session_id = str(hash(file_path))  # Simple session ID
        interview_sessions[session_id] = {"questions": questions}

        first_question = questions.pop(0)
        interview_sessions[session_id]['questions'] = questions
        
        return jsonify({"question": first_question, "session_id": session_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
