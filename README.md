# Credit Card Fraud Detection System

## Project Overview

This project is a Machine Learning web application that detects whether a credit card transaction is fraudulent or legitimate.

The system uses a Random Forest Classifier trained on a credit card fraud dataset and provides predictions through a FastAPI backend with an interactive HTML, CSS, and JavaScript frontend.

---

## Features

* Fraud Detection Prediction
* Random Forest Machine Learning Model
* FastAPI Backend
* Swagger API Documentation
* Interactive Frontend UI
* Model Information Dashboard
* Input Validation
* Prediction Confidence Scores
* Reset Functionality
* Dynamic Result Coloring

---

## Tech Stack

### Machine Learning

* Python
* Pandas
* Scikit-Learn
* Joblib

### Backend

* FastAPI
* Uvicorn

### Frontend

* HTML
* CSS
* JavaScript

---

## Project Structure

CreditCardFraudDeployment/

├── app.py

├── credit_card_fraud_model.pkl

├── requirements.txt

├── templates/

│ └── index.html

└── static/

├── style.css

└── script.js

---

## API Endpoints

### Home

GET /

Returns API status information.

### Model Information

GET /model-info

Returns details about the trained machine learning model.

### Prediction

POST /predict

Accepts transaction feature values and returns fraud prediction results.

---

## Application Workflow

User Input

↓

Frontend (HTML/CSS/JavaScript)

↓

FastAPI Backend

↓

Random Forest Model

↓

Prediction

↓

Result Display

---

## Installation

Clone the repository:

git clone https://github.com/your-username/credit-card-fraud-detection-system.git

Move into project directory:

cd credit-card-fraud-detection-system

Install dependencies:

pip install -r requirements.txt

Run FastAPI:

uvicorn app:app --reload

---

## Swagger Documentation

After running the application:

http://127.0.0.1:8000/docs

---

## Future Improvements

* Prediction History Tracking
* Dashboard Analytics
* Batch CSV Predictions
* Cloud Deployment
* User Authentication

---

## Author

Shanmukh Maruthi
