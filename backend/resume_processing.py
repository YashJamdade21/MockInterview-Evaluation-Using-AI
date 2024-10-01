import pdfplumber
from transformers import pipeline
import random

# Load NER pipeline for resume data extraction
ner_pipeline = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")

def autonomous_resume_processing(file_path, job_role=''):
    resume_text = extract_text_from_pdf(file_path)
    
    if "Error" in resume_text:
        return {"error": resume_text}
    
    resume_data = extract_resume_data(resume_text)
    questions = generate_questions(resume_data, job_role)
    
    return {"questions": questions}

# Function to extract text from a PDF
def extract_text_from_pdf(file_path):
    try:
        with pdfplumber.open(file_path) as pdf:
            text = ''.join([page.extract_text() for page in pdf.pages if page.extract_text() is not None])
        if not text:
            raise ValueError("No text found in the PDF.")
        return text
    except Exception as e:
        return f"Error reading PDF file: {e}"

# Function to extract skills, experience, and education from resume text
def extract_resume_data(resume_text):
    entities = ner_pipeline(resume_text)
    skills = []
    experience = []
    education = []

    skills_keywords = ["Python", "machine learning", "data analysis", "Java", "project management", "SQL", "deep learning", "cloud computing"]

    for entity in entities:
        if entity['entity'].startswith("B-ORG"):
            if "university" in entity['word'].lower():
                education.append(entity['word'])
            else:
                experience.append(entity['word'])

    for skill in skills_keywords:
        if skill.lower() in resume_text.lower():
            skills.append(skill)

    return {"skills": skills, "experience": experience, "education": education}

# Function to generate interview questions based on resume data and job role
def generate_questions(resume_data, job_role):
    questions = set()

    # Generate questions based on skills, experience, and education
    if resume_data['skills']:
        for skill in resume_data['skills']:
            questions.add(f"Can you explain your experience with {skill}?")
    if resume_data['experience']:
        for exp in resume_data['experience']:
            questions.add(f"Describe your responsibilities during your time at {exp}.")
    if resume_data['education']:
        for edu in resume_data['education']:
            questions.add(f"How did your education at {edu} prepare you for this role?")

    # Fallback question if no data is found
    if not questions:
        questions.add(f"What makes you a good fit for a {job_role} role?")
    
    # Job role-specific questions
    role_specific_questions = {
        "data scientist": [
            "What are the most important metrics to consider when evaluating a model?",
            "How do you approach feature engineering in your projects?"
        ],
        "software engineer": [
            "How do you ensure code quality?",
            "Can you discuss a challenging programming problem you've solved?"
        ]
    }

    questions.update(role_specific_questions.get(job_role.lower(), []))

    # General questions
    general_questions = [
        "What are your key strengths?",
        "Why do you think you're a good fit for this job?"
    ]

    questions.update(random.sample(general_questions, 2))

    return list(questions)

# import pdfplumber
# from transformers import pipeline
# import random

# # Function to extract text from a PDF
# def extract_text_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             text = ''.join([page.extract_text() for page in pdf.pages])
#         return text
#     except Exception as e:
#         return f"Error reading PDF file: {e}"

# # Load NER pipeline for resume data extraction
# ner_pipeline = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")

# # Function to extract skills, experience, and education from resume text
# def extract_resume_data(resume_text):
#     entities = ner_pipeline(resume_text)
#     skills = []
#     experience = []
#     education = []

#     skills_keywords = ["Python", "machine learning", "data analysis", "Java", "project management", "SQL", "deep learning", "cloud computing"]

#     for entity in entities:
#         if entity['entity'].startswith("B-ORG"):
#             if "university" in entity['word'].lower():
#                 education.append(entity['word'])
#             else:
#                 experience.append(entity['word'])

#     for skill in skills_keywords:
#         if skill.lower() in resume_text.lower():
#             skills.append(skill)

#     return {"skills": skills, "experience": experience, "education": education}

# # Function to generate interview questions based on resume data and job role
# def generate_questions(resume_data, job_role):
#     questions = set()

#     # Generate questions based on skills, experience, and education
#     for skill in resume_data['skills']:
#         questions.add(f"Can you explain your experience with {skill}?")

#     for exp in resume_data['experience']:
#         questions.add(f"Describe your responsibilities during your time at {exp}.")

#     for edu in resume_data['education']:
#         questions.add(f"How did your education at {edu} prepare you for this role?")

#     # Job role-specific questions
#     role_specific_questions = {
#         "data scientist": [
#             "What are the most important metrics to consider when evaluating a model?",
#             "How do you approach feature engineering in your projects?"
#         ],
#         "software engineer": [
#             "How do you ensure code quality?",
#             "Can you discuss a challenging programming problem you've solved?"
#         ]
#     }

#     questions.update(role_specific_questions.get(job_role.lower(), []))

#     # General questions
#     general_questions = [
#         "What are your key strengths?",
#         "Why do you think you're a good fit for this job?"
#     ]

#     questions.update(random.sample(general_questions, 2))

#     return list(questions)

# # Autonomous resume processing function
# async def autonomous_resume_processing(file_path, job_role=''):
#     resume_text = extract_text_from_pdf(file_path)
    
#     if "Error" in resume_text:
#         return {"error": resume_text}
    
#     resume_data = extract_resume_data(resume_text)
#     questions = generate_questions(resume_data, job_role)
    
#     return {"questions": questions}
# import pdfplumber
# from transformers import pipeline
# import random

# def autonomous_resume_processing(file_path, job_role=''):
#     resume_text = extract_text_from_pdf(file_path)
    
#     if "Error" in resume_text:
#         return {"error": resume_text}
    
#     resume_data = extract_resume_data(resume_text)
#     questions = generate_questions(resume_data, job_role)
    
#     return {"questions": questions}


# # Function to extract text from a PDF
# def extract_text_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             text = ''.join([page.extract_text() for page in pdf.pages])
#         return text
#     except Exception as e:
#         return f"Error reading PDF file: {e}"

# # Load NER pipeline for resume data extraction
# ner_pipeline = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")

# # Function to extract skills, experience, and education from resume text
# def extract_resume_data(resume_text):
#     entities = ner_pipeline(resume_text)
#     skills = []
#     experience = []
#     education = []

#     skills_keywords = ["Python", "machine learning", "data analysis", "Java", "project management", "SQL", "deep learning", "cloud computing"]

#     for entity in entities:
#         if entity['entity'].startswith("B-ORG"):
#             if "university" in entity['word'].lower():
#                 education.append(entity['word'])
#             else:
#                 experience.append(entity['word'])

#     for skill in skills_keywords:
#         if skill.lower() in resume_text.lower():
#             skills.append(skill)

#     return {"skills": skills, "experience": experience, "education": education}

# # Function to generate interview questions based on resume data and job role
# def generate_questions(resume_data, job_role):
#     questions = set()

#     # Generate questions based on skills, experience, and education
#     for skill in resume_data['skills']:
#         questions.add(f"Can you explain your experience with {skill}?")

#     for exp in resume_data['experience']:
#         questions.add(f"Describe your responsibilities during your time at {exp}.")

#     for edu in resume_data['education']:
#         questions.add(f"How did your education at {edu} prepare you for this role?")

#     # Job role-specific questions
#     role_specific_questions = {
#         "data scientist": [
#             "What are the most important metrics to consider when evaluating a model?",
#             "How do you approach feature engineering in your projects?"
#         ],
#         "software engineer": [
#             "How do you ensure code quality?",
#             "Can you discuss a challenging programming problem you've solved?"
#         ]
#     }

#     questions.update(role_specific_questions.get(job_role.lower(), []))

#     # General questions
#     general_questions = [
#         "What are your key strengths?",
#         "Why do you think you're a good fit for this job?"
#     ]

#     questions.update(random.sample(general_questions, 2))

#     return list(questions)


# # Autonomous resume processing function
# async def autonomous_resume_processing(file_path, job_role=''):
#     resume_text = extract_text_from_pdf(file_path)
    
#     if "Error" in resume_text:
#         return {"error": resume_text}
    
#     resume_data = extract_resume_data(resume_text)
#     questions = generate_questions(resume_data, job_role)
    
#     return {"questions": questions}
