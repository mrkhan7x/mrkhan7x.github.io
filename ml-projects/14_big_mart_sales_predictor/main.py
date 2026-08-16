import os
import pickle
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Big Mart Sales Forecasting API")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = None
encoders = None

class ItemSalesRequest(BaseModel):
    Item_Identifier: str = Field(..., example="FDA15")
    Item_Weight: float = Field(..., example=9.30)
    Item_Fat_Content: str = Field(..., example="Low Fat")
    Item_Visibility: float = Field(..., example=0.016047)
    Item_Type: str = Field(..., example="Dairy")
    Item_MRP: float = Field(..., example=249.8092)
    Outlet_Identifier: str = Field(..., example="OUT049")
    Outlet_Size: str = Field(..., example="Medium")
    Outlet_Location_Type: str = Field(..., example="Tier 1")
    Outlet_Type: str = Field(..., example="Supermarket Type1")
    Outlet_Age: int = Field(..., example=14)

@app.on_event("startup")
def load_artifacts():
    global model, encoders
    model_path = os.path.join(BASE_DIR, "model.pkl")
    encoders_path = os.path.join(BASE_DIR, "encoders.pkl")
    try:
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        with open(encoders_path, "rb") as f:
            encoders = pickle.load(f)
        print("Big Mart Sales model and encoders loaded successfully!")
    except FileNotFoundError:
        print("[Error] model.pkl or encoders.pkl missing. Run train.py first!")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Big Mart Retail Sales Forecasting Engine",
        "version": "1.0.0"
    }

@app.post("/predict")
def predict_sales(req: ItemSalesRequest):
    if model is None or encoders is None:
        raise HTTPException(status_code=500, detail="Sales prediction model not loaded.")
    
    # Helper to encode categorical inputs safely
    def encode_val(col, val):
        if col in encoders:
            le = encoders[col]
            if val in le.classes_:
                return int(le.transform([val])[0])
            return 0
        return 0

    encoded_data = {
        "Item_Identifier": encode_val("Item_Identifier", req.Item_Identifier),
        "Item_Weight": req.Item_Weight,
        "Item_Fat_Content": encode_val("Item_Fat_Content", req.Item_Fat_Content),
        "Item_Visibility": req.Item_Visibility if req.Item_Visibility > 0 else 0.0661,
        "Item_Type": encode_val("Item_Type", req.Item_Type),
        "Item_MRP": req.Item_MRP,
        "Outlet_Identifier": encode_val("Outlet_Identifier", req.Outlet_Identifier),
        "Outlet_Size": encode_val("Outlet_Size", req.Outlet_Size),
        "Outlet_Location_Type": encode_val("Outlet_Location_Type", req.Outlet_Location_Type),
        "Outlet_Type": encode_val("Outlet_Type", req.Outlet_Type),
        "Outlet_Age": req.Outlet_Age
    }
    
    input_df = pd.DataFrame([encoded_data])
    predicted_sales = float(model.predict(input_df)[0])
    predicted_sales = max(0.0, predicted_sales)
    
    return {
        "predicted_outlet_sales_usd": round(predicted_sales, 2),
        "forecast_metrics": {
            "estimated_low_bound_usd": round(max(0.0, predicted_sales - 865.86), 2),
            "estimated_high_bound_usd": round(predicted_sales + 865.86, 2)
        },
        "item_metadata": {
            "item_id": req.Item_Identifier,
            "mrp": req.Item_MRP,
            "outlet": req.Outlet_Identifier
        }
    }
