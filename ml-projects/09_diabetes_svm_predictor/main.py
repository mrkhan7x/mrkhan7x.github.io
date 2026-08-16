# 🌐 FastAPI SVM Diabetes Predictor Server
# File: D:\DA + DE\PYTHON_PROJECTS\09_diabetes_svm_predictor\main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="PIMA Diabetes SVM Predictor API")

model = None
scaler = None

@app.on_event("startup")
def load_model_and_scaler():
    """
    Loads model.pkl and scaler.pkl from the local directory when uvicorn starts.
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

# Pydantic schema validating input clinical metrics
class PatientMetrics(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

@app.post("/predict")
def predict_diabetes_risk(patient: PatientMetrics):
    """
    Predicts if a patient is diabetic based on clinical metrics using the trained SVM.
    """
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model files not loaded on the server.")
        
    # package parameters in order matching training features
    patient_data = np.array([[
        patient.Pregnancies,
        patient.Glucose,
        patient.BloodPressure,
        patient.SkinThickness,
        patient.Insulin,
        patient.BMI,
        patient.DiabetesPedigreeFunction,
        patient.Age
    ]])
    
    # Scale input
    patient_scaled = scaler.transform(patient_data)
    
    # Predict and calculate probability of class 1 (Diabetic)
    prediction = int(model.predict(patient_scaled)[0])
    probability = float(model.predict_proba(patient_scaled)[0][1])
    
    return {
        "prediction": prediction,
        "probability": round(probability, 4),
        "status": "Diabetic" if prediction == 1 else "Non-Diabetic"
    }
