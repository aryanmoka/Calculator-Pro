# Calculator-Pro

Calculator-Pro is a comprehensive web application offering a suite of calculators and conversion tools, including an AI-powered assistant. It is built with React, TypeScript, Tailwind CSS, and features a Python backend for AI functionalities.

🔗 Live Demo

👉 [Try CookBot Here]((https://omnicalcpro.netlify.app/))

## Features
- **Standard Calculator**
- **Scientific Calculator**
- **Age Calculator**
- **BMI Calculator**
- **Currency Converter**
- **Date Calculator**
- **Loan Calculator**
- **Percentage Calculator**
- **Tip Calculator**
- **Unit Converter**
- **AI Assistant**: Get answers and help with calculations
- **Contact Form**

## Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Python (Flask), OpenAI API (for AI assistant)
- **Other**: PostCSS, ESLint

## Folder Structure
```
Calculator-Pro/
├── backend/ # Python backend for AI assistant
│ ├── ai_assistant.py
│ ├── server.py
│ ├── requirements.txt
│ └── Procfile
├── src/ # Frontend source code
│ ├── components/ # React components
│ │ ├── AI/
│ │ ├── Calculators/
│ │ ├── Contact/
│ │ └── Layout/
│ ├── services/ # API service files
│ ├── types/ # TypeScript types
│ ├── App.tsx
│ └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.8+

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Calculator-Pro.git
cd Calculator-Pro
```

#### 2. Install frontend dependencies
```bash
npm install
```

#### 3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

#### 1. Start the backend server
```bash
cd backend
python server.py
```

#### 2. Start the frontend development server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000` by default.

## Usage
- Access different calculators from the navigation menu.
- Use the AI Assistant for help or to answer questions.
- Submit feedback or queries via the Contact Form.

## Contribution
Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Contact
For questions or support, please contact [aryanmokashi28@gmail.com].
