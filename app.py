from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(
    title="Credit Card Fraud Detection API",
    description="Predicts whether a credit card transaction is fraudulent or legitimate using a Machine Learning model.",
    version="1.0.0"
)

# Frontend setup
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load trained model
model = joblib.load("credit_card_fraud_model.pkl")


class Transaction(BaseModel):
    V1: float
    V2: float
    V3: float
    V4: float
    V5: float
    V6: float
    V7: float
    V8: float
    V9: float
    V10: float
    V11: float
    V12: float
    V13: float
    V14: float
    V15: float
    V16: float
    V17: float
    V18: float
    V19: float
    V20: float
    V21: float
    V22: float
    V23: float
    V24: float
    V25: float
    V26: float
    V27: float
    V28: float
    scaled_amount: float
    scaled_time: float


@app.get("/")
def home():
    return {"message": "Credit Card Fraud Detection API"}


@app.get("/ui", response_class=HTMLResponse)
def ui(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}
    )


@app.get("/model-info")
def model_info():
    return {
        "model_name": "Random Forest Classifier",
        "problem_type": "Binary Classification",
        "target": "Credit Card Fraud Detection",
        "features": 30,
        "output_classes": {
            "0": "Legitimate Transaction",
            "1": "Fraudulent Transaction"
        }
    }


@app.post("/predict")
def predict(transaction: Transaction):

    data = pd.DataFrame([transaction.model_dump()])

    prediction = model.predict(data)[0]

    probabilities = model.predict_proba(data)[0]
    legitimate_probability = probabilities[0]
    fraud_probability = probabilities[1]

    if prediction == 1:
        result = "Fraudulent Transaction"
    else:
        result = "Legitimate Transaction"

    confidence = max(fraud_probability, legitimate_probability)

    return {
        "prediction": result,
        "class": int(prediction),
        "fraud_probability": round(float(fraud_probability), 4),
        "legitimate_probability": round(float(legitimate_probability), 4),
        "confidence_percentage": f"{confidence * 100:.2f}%"
    }