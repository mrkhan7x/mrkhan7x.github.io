# 🌐 FastAPI Diabetes Predictor Server
# File: D:\DA + DE\PYTHON_PROJECTS\06_diabetes_predictor\main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="Diabetes Readmission Risk API")

# Global variables to hold model and scaler in memory
model = None
scaler = None

@app.on_event("startup")
def load_model_and_scaler():
    """
    Loads the trained model and scaler from the pkl files when the server starts up.
    """
    global model, scaler
    try:
        with open("model.pkl", "rb") as f:
            model = pickle.load(f)
        with open("scaler.pkl", "rb") as f:
            scaler = pickle.load(f)
        print("Model and Scaler loaded successfully!")
    except FileNotFoundError:
        print("[Error] model.pkl or scaler.pkl not found. Run train.py first!")

# Pydantic schema to validate incoming patient metrics
class PatientMetrics(BaseModel):
    time_in_hospital: int
    num_lab_procedures: int
    num_procedures: int
    num_medications: int
    number_diagnoses: int

@app.post("/predict")
def predict_readmission(patient: PatientMetrics):
    """
    Exposes a POST endpoint to predict the readmission risk of a patient.
    """
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model not loaded on server.")
        
    import pandas as pd
    
    # 1. Package the patient metrics into a DataFrame with correct feature names to prevent scaling warnings
    patient_features = pd.DataFrame([{
        "time_in_hospital": patient.time_in_hospital,
        "num_lab_procedures": patient.num_lab_procedures,
        "num_procedures": patient.num_procedures,
        "num_medications": patient.num_medications,
        "number_diagnoses": patient.number_diagnoses
    }])
    
    features_scaled = scaler.transform(patient_features)
    
    # YOUR TASK 2: Use the model to predict the class (0 or 1) and the probability.
    # Hint:
    # - prediction = int(model.predict(features_scaled)[0])
    # - probability = float(model.predict_proba(features_scaled)[0][1])
    prediction = int(model.predict(features_scaled)[0])
    probability = float(model.predict_proba(features_scaled)[0][1])
    
    # Return formatted results
    return {
        "readmission_risk": prediction,
        "probability": round(probability, 4),
        "status": "High Risk" if prediction == 1 else "Low Risk"
    }
