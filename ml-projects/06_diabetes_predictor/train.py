# 🩺 Diabetes Readmission Predictor — Training Pipeline
# File: D:\DA + DE\PYTHON_PROJECTS\06_diabetes_predictor\train.py
import pandas as pd
import numpy as np
import pickle
import json
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

DATA_PATH = "D:/DA + DE/LEARNING/diabetic_data.csv"

def load_and_preprocess_data():
    print("Loading clinical records dataset...")
    df = pd.read_csv(DATA_PATH)
    
    # 1. Select the features we want to train our model on
    features = [
        "time_in_hospital", 
        "num_lab_procedures", 
        "num_procedures", 
        "num_medications", 
        "number_diagnoses"
    ]
    
    # 2. Create the features matrix X and the binary target y
    X = df[features]
    
    # YOUR TASK 1: Convert the 'readmitted' target into binary classes:
    # Set it to 1 if the patient was readmitted in less than 30 days ("<30").
    # Otherwise, set it to 0.
    # Hint: y = (df["readmitted"] == "<30").astype(int)
    y = (df["readmitted"] == "<30").astype(int)
    
    # Split into train and test sets (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    return X_train, X_test, y_train, y_test

def train_model(X_train, y_train):
    # 1. Scale features (essential for Logistic Regression!)
    scaler = StandardScaler()
    
    X_train_scaled = scaler.fit_transform(X_train)
    
    # 2. Initialize and train the model
    print("Training Logistic Regression model...")
    model = LogisticRegression(random_state=42)
    
    model.fit(X_train_scaled, y_train)
    return model, scaler

if __name__ == "__main__":
    X_train, X_test, y_train, y_test = load_and_preprocess_data()
    
    if y_test is not None:
        model, scaler = train_model(X_train, y_train)
        
        # Save model and scaler to files using pickle
        with open("model.pkl", "wb") as f:
            pickle.dump(model, f)
        with open("scaler.pkl", "wb") as f:
            pickle.dump(scaler, f)
        print("Model and Scaler successfully saved!")
        
        # Prepare evaluation data for the evaluator module
        X_test_scaled = scaler.transform(X_test)
        y_pred = model.predict(X_test_scaled)
        
        # Save true labels and predictions to a JSON file for Column B
        eval_data = {
            "y_test": y_test.tolist(),
            "y_pred": y_pred.tolist()
        }
        with open("evaluation_data.json", "w") as f:
            json.dump(eval_data, f)
        print("Test predictions saved to evaluation_data.json.")
