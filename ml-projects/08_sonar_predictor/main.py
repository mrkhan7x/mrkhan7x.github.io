# 🌐 FastAPI Sonar Classifier Server
# File: D:\DA + DE\PYTHON_PROJECTS\08_sonar_predictor\main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pickle
import numpy as np

app = FastAPI(title="Sonar Rock vs. Mine Classifier API")

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

class SonarData(BaseModel):
    features: List[float]

@app.post("/predict")
def predict_rock_or_mine(sonar: SonarData):
    """
    Predicts if the input sonar signature belongs to a Rock (0) or Mine (1).
    """
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model files not loaded on the server.")
        
    if len(sonar.features) != 60:
        raise HTTPException(status_code=400, detail="Input features list must contain exactly 60 items.")
        
    # Format and scale features
    features_array = np.array(sonar.features).reshape(1, -1)
    features_scaled = scaler.transform(features_array)
    
    # Predict and calculate probability of being a Mine (class 1)
    prediction = int(model.predict(features_scaled)[0])
    probability = float(model.predict_proba(features_scaled)[0][1])
    
    return {
        "prediction": prediction,
        "probability": round(probability, 4),
        "label": "Mine" if prediction == 1 else "Rock"
    }
