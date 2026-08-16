import os
import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Heart Disease Triage API")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = None
scaler = None

class PatientDataRequest(BaseModel):
    age: int = Field(..., example=63, description="Age in years")
    sex: int = Field(..., example=1, description="1 = Male, 0 = Female")
    cp: int = Field(..., example=3, description="Chest pain type (0-3)")
    trestbps: int = Field(..., example=145, description="Resting blood pressure (mm Hg)")
    chol: int = Field(..., example=233, description="Serum cholestoral (mg/dl)")
    fbs: int = Field(..., example=1, description="Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)")
    restecg: int = Field(..., example=0, description="Resting ECG results (0-2)")
    thalach: int = Field(..., example=150, description="Maximum heart rate achieved")
    exang: int = Field(..., example=0, description="Exercise induced angina (1 = yes, 0 = no)")
    oldpeak: float = Field(..., example=2.3, description="ST depression induced by exercise")
    slope: int = Field(..., example=0, description="Slope of peak exercise ST segment (0-2)")
    ca: int = Field(..., example=0, description="Number of major vessels (0-4)")
    thal: int = Field(..., example=1, description="Thalassemia status (0-3)")

@app.on_event("startup")
def load_artifacts():
    global model, scaler
    model_path = os.path.join(BASE_DIR, "model.pkl")
    scaler_path = os.path.join(BASE_DIR, "scaler.pkl")
    try:
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        with open(scaler_path, "rb") as f:
            scaler = pickle.load(f)
        print("Heart Disease model and scaler loaded successfully!")
    except FileNotFoundError:
        print("[Error] model.pkl or scaler.pkl missing. Run train.py first!")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Heart Disease Diagnostic Triage API",
        "version": "1.0.0"
    }

@app.post("/predict")
def predict_heart_disease(request: PatientDataRequest):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Server model artifacts not loaded.")
    
    # Raw features vector
    raw_features = np.array([[
        request.age, request.sex, request.cp, request.trestbps, request.chol,
        request.fbs, request.restecg, request.thalach, request.exang,
        request.oldpeak, request.slope, request.ca, request.thal
    ]])
    
    # Scale features
    scaled_features = scaler.transform(raw_features)
    
    # Predict class & probabilities
    prediction = int(model.predict(scaled_features)[0])
    probabilities = model.predict_proba(scaled_features)[0]
    
    disease_prob = float(probabilities[1])
    healthy_prob = float(probabilities[0])
    
    status = "DISEASE_DETECTED" if prediction == 1 else "HEALTHY"
    triage_priority = "HIGH" if disease_prob > 0.70 else ("MEDIUM" if disease_prob > 0.40 else "LOW")
    
    return {
        "prediction": prediction,
        "status": status,
        "risk_probability_percentage": round(disease_prob * 100, 2),
        "confidence_scores": {
            "healthy": round(healthy_prob, 4),
            "heart_disease": round(disease_prob, 4)
        },
        "triage_priority": triage_priority
    }
