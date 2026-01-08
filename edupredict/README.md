# 🎓 EduPredict – Early Academic Performance Prediction System

EduPredict is a full-stack web application designed to **identify and predict academically at-risk students at an early stage**.  
The system analyzes academic, behavioral, and attendance-related data to help educators take **timely preventive actions** and improve student outcomes.

The application is built using **React** for the frontend and **Flask** for the backend, following a **RESTful architecture**.

---

## 📌 Problem Statement

In many educational institutions, identifying weak or struggling students is often done **manually**, which is:
- Time-consuming
- Error-prone
- Reactive rather than proactive

There is a lack of **early-warning systems** that can predict academic risk before final examinations.

---

## 🎯 Objectives

- Predict students who are at academic risk
- Provide early alerts to educators
- Centralize academic performance data
- Improve decision-making through data-driven insights

---

## 🚀 Features

- User authentication (Admin / Teacher)
- Student data management
- Academic performance analysis
- Risk classification (Low / Medium / High)
- Prediction results dashboard
- Secure password reset system
- REST API based architecture

---

## 🛠️ Technology Stack

### Frontend
- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Axios / Fetch API

### Backend
- Flask (Python)
- Flask-RESTful
- Flask-CORS
- Flask-SQLAlchemy

### Database
- SQLite / MySQL

---

## 🏗️ System Architecture

EduPredict follows a **client-server architecture**:

1. **React Frontend**
   - Handles user interaction
   - Sends HTTP requests to backend
   - Displays prediction results and dashboards

2. **Flask Backend**
   - Processes API requests
   - Handles business logic
   - Communicates with the database
   - Returns JSON responses

3. **Database**
   - Stores student data
   - Stores user credentials
   - Stores password reset tokens

---

## 🔄 Application Workflow

1. User logs into the system
2. Student academic data is entered
3. Data is sent from React to Flask via API
4. Flask processes the data and performs prediction
5. Risk level is calculated
6. Results are displayed on the frontend

---

## 📂 Project Structure

