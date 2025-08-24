import os
import smtplib
from email.mime.text import MIMEText
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from ai_assistant import AIAssistant

# Load environment variables
load_dotenv()

GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")

if not all([GMAIL_APP_PASSWORD, SENDER_EMAIL, RECEIVER_EMAIL]):
    raise ValueError("Email environment variables not set. Please check your .env file.")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Instantiate AI Assistant
ai_assistant = AIAssistant()

# ✅ Root route for Render homepage
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "project": "OmniCalc Backend",
        "status": "running ✅",
        "endpoints": {
            "send_email": "/send-email (POST)",
            "ai_query": "/api/ai_query (POST)"
        }
    })

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
        app.logger.error(f"Error sending email: {e}")
        return jsonify({"message": "Failed to send email"}), 500

@app.route('/api/ai_query', methods=['POST'])
def ai_query():
    data = request.json
    query = data.get('query')
    if not query:
        return jsonify({"message": "No query provided."}), 400

    response = ai_assistant.process_query(query)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)  # On Render, gunicorn handles running
