# 💰 Smart Budget Planner

A full-stack web application that helps students analyze their monthly budget, calculate a financial risk score, and receive smart recommendations along with a 6-month financial projection.

🌐 **Live Demo:**  
https://ai-budget-planner-rosy.vercel.app/

---

## 🚀 Features

- 📊 Monthly expense analysis
- 🎯 Financial risk score (0–100)
- 🚦 Risk level classification:
  - Low
  - Moderate
  - High
  - Critical
- 📈 6-Month financial projection
- 🧠 Smart financial recommendations
- 📱 Fully responsive mobile-friendly UI
- ☁️ Cloud deployed (Frontend + Backend)
- 🔄 Automatic deployment via GitHub integration

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Axios
- CSS (Responsive Design)
- Hosted on Vercel

### Backend
- Node.js
- Express.js
- REST API
- Hosted on Railway

---

## 🔄 How It Works

1. The user enters:
   - Monthly allowance
   - Rent
   - Food expenses
   - Travel expenses
   - Entertainment expenses

2. The React frontend sends a POST request to the backend API:

   /ai-budget

3. The backend:
   - Calculates total expenses
   - Computes savings ratio
   - Generates a financial risk score
   - Classifies risk level
   - Produces smart financial suggestions
   - Generates a 6-month projection

4. The results are returned and dynamically displayed in the UI.

---

## 🧠 Risk Score Calculation

The risk score is calculated based on:

- Expense-to-income ratio
- Savings percentage
- Overspending behavior

### Score Classification

| Score Range | Risk Level |
|-------------|------------|
| 80–100      | Low Risk   |
| 60–79       | Moderate Risk |
| 40–59       | High Risk  |
| 0–39        | Critical Risk |

---

## 📂 Project Structure

smart-budget-planner/
│
├── client/        # React Frontend
│
└── server/        # Express Backend

---

## ⚙️ Local Setup (Optional)

### Clone Repository

git clone https://github.com/YOUR_USERNAME/ai-budget-planner.git

---

### Backend Setup

cd server  
npm install  
npm start  

Backend runs on:  
http://localhost:5000  

---

### Frontend Setup

cd client  
npm install  
npm start  

Frontend runs on:  
http://localhost:3000  

---

## 🌍 Deployment

Frontend:
- Hosted on Vercel
- Automatically redeploys on every GitHub push

Backend:
- Hosted on Railway
- Public REST API endpoint

Both services communicate securely over HTTPS.

---

## 📌 Future Improvements

- Integrate real AI model (Gemini / OpenAI)
- Add authentication system
- Add database for saving budget history
- Add graphical charts (Pie / Bar graphs)
- Add downloadable PDF financial report
- Add user dashboard with history tracking

---

## 👨‍💻 Author

Sanjay Chandrakumaran  
Computer Science & Engineering  
Madras Institute of Technology  
Anna University

---

## 📜 License

This project is created for academic and demonstration purposes.