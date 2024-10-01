import pyttsx3
import speech_recognition as sr
import wave

# Function for Text-to-Speech (TTS)
def ask_question(question):
    engine = pyttsx3.init()
    engine.say(question)
    engine.runAndWait()

# Function for Speech-to-Text (STT)
def listen_answer():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)
        try:
            answer = r.recognize_google(audio)
            print(f"Answer: {answer}")
            return answer
        except sr.UnknownValueError:
            print("Could not understand, please repeat.")
            return ""
        except sr.RequestError as e:
            print(f"Error with the recognition service: {e}")
            return ""

# Function to save audio response as a file
def save_audio(audio):
    with wave.open("response.wav", "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)  # 2 bytes for PCM
        wf.setframerate(44100)
        wf.writeframes(audio.get_raw_data())
