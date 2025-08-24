import os
import smtplib
from email.mime.text import MIMEText
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from ai_assistant import AIAssistant # Import the new class

load_dotenv()

GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
SENDER_EMAIL = 'aryanmokashi28@gmail.com'
RECEIVER_EMAIL = 'aryanmokashi28@gmail.com'

if not GMAIL_APP_PASSWORD:
    raise ValueError("GMAIL_APP_PASSWORD not set. Please check your .env file.")

app = Flask(__name__)
CORS(app)

ai_assistant = AIAssistant() # Instantiate the AI assistant class

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message_content = data.get('message')

    if not all([name, email, message_content]):
        return jsonify({"message": "All fields are required"}), 400

    subject = f"New Contact Form Submission from {name}"
    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message_content}"

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(SENDER_EMAIL, GMAIL_APP_PASSWORD)
            smtp.send_message(msg)
        return jsonify({"message": "Email sent successfully!"}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"message": "Failed to send email"}), 500

@app.route('/api/ai_query', methods=['POST'])
def ai_query():
    data = request.json
    query = data.get('query')
    if not query:
        return jsonify({"message": "No query provided."}), 400

    response = ai_assistant.process_query(query) # Use the new class here
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)