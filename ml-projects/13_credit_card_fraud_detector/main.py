import os
import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List

app = FastAPI(title="Fintech Credit Card Fraud Detection API")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = None

class TransactionRequest(BaseModel):
    Time: float = Field(..., example=0.0, description="Seconds elapsed since first dataset transaction")
    V1: float = Field(..., example=-1.359807)
    V2: float = Field(..., example=-0.072781)
    V3: float = Field(..., example=2.536347)
    V4: float = Field(..., example=1.378155)
    V5: float = Field(..., example=-0.338321)
    V6: float = Field(..., example=0.462388)
    V7: float = Field(..., example=0.239599)
    V8: float = Field(..., example=0.098698)
    V9: float = Field(..., example=0.363787)
    V10: float = Field(..., example=0.090794)
    V11: float = Field(..., example=-0.551600)
    V12: float = Field(..., example=-0.617801)
    V13: float = Field(..., example=-0.991390)
    V14: float = Field(..., example=-0.311169)
    V15: float = Field(..., example=1.468177)
    V16: float = Field(..., example=-0.470401)
    V17: float = Field(..., example=0.207971)
    V18: float = Field(..., example=0.025791)
    V19: float = Field(..., example=0.403993)
    V20: float = Field(..., example=0.251412)
    V21: float = Field(..., example=-0.018307)
    V22: float = Field(..., example=0.277838)
    V23: float = Field(..., example=-0.110474)
    V24: float = Field(..., example=0.066928)
    V25: float = Field(..., example=0.128539)
    V26: float = Field(..., example=-0.189115)
    V27: float = Field(..., example=0.133558)
    V28: float = Field(..., example=-0.021053)
    Amount: float = Field(..., example=149.62, description="Transaction Amount in USD")

@app.on_event("startup")
def load_artifacts():
    global model
    model_path = os.path.join(BASE_DIR, "model.pkl")
    try:
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        print("Fraud detection model loaded successfully!")
    except FileNotFoundError:
        print("[Error] model.pkl missing. Run train.py first!")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Fintech Fraud Evaluation Engine",
        "version": "1.0.0"
    }

@app.post("/evaluate")
def evaluate_transaction(tx: TransactionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Fraud detection model not initialized.")
    
    features = np.array([[
        tx.Time, tx.V1, tx.V2, tx.V3, tx.V4, tx.V5, tx.V6, tx.V7, tx.V8, tx.V9,
        tx.V10, tx.V11, tx.V12, tx.V13, tx.V14, tx.V15, tx.V16, tx.V17, tx.V18, tx.V19,
        tx.V20, tx.V21, tx.V22, tx.V23, tx.V24, tx.V25, tx.V26, tx.V27, tx.V28, tx.Amount
    ]])
    
    prediction = int(model.predict(features)[0])
    probabilities = model.predict_proba(features)[0]
    
    fraud_prob = float(probabilities[1])
    legit_prob = float(probabilities[0])
    
    status = "FLAGGED_FRAUD" if prediction == 1 else "CLEARED"
    risk_level = "HIGH_RISK" if fraud_prob > 0.75 else ("MEDIUM_RISK" if fraud_prob > 0.40 else "LOW_RISK")
    
    return {
        "prediction": prediction,
        "status": status,
        "fraud_probability_percentage": round(fraud_prob * 100, 2),
        "confidence_scores": {
            "legitimate": round(legit_prob, 4),
            "fraudulent": round(fraud_prob, 4)
        },
        "risk_level": risk_level
    }
