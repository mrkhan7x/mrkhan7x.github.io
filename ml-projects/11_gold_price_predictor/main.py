import os
import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Gold Price Prediction API")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = None

class GoldPriceRequest(BaseModel):
    SPX: float = Field(..., description="S&P 500 Index value (e.g. 1447.16)", example=1447.16)
    USO: float = Field(..., description="United States Oil Fund price (e.g. 78.47)", example=78.47)
    SLV: float = Field(..., description="Silver ETF price (e.g. 15.18)", example=15.18)
    EUR_USD: float = Field(..., alias="EUR/USD", description="EUR to USD exchange rate (e.g. 1.47)", example=1.471692)

    class Config:
        populate_by_name = True

@app.on_event("startup")
def load_model():
    global model
    model_path = os.path.join(BASE_DIR, "model.pkl")
    try:
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        print("Gold Price Regressor model loaded successfully!")
    except FileNotFoundError:
        print("[Error] model.pkl not found. Run train.py first!")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Gold Price Predictor API",
        "version": "1.0.0"
    }

@app.post("/predict")
def predict_gold_price(request: GoldPriceRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Server model file not loaded.")
    
    # Input order expected by model: ['SPX', 'USO', 'SLV', 'EUR/USD']
    features = np.array([[request.SPX, request.USO, request.SLV, request.EUR_USD]])
    
    predicted_price = float(model.predict(features)[0])
    
    return {
        "predicted_gold_price_usd": round(predicted_price, 2),
        "inputs": {
            "SPX": request.SPX,
            "USO": request.USO,
            "SLV": request.SLV,
            "EUR/USD": request.EUR_USD
        }
    }
