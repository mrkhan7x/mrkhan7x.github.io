# 🚢 Sonar Rock vs. Mine Predictor — Training Pipeline
# File: D:\DA + DE\PYTHON_PROJECTS\08_sonar_predictor\train.py
import pandas as pd
import numpy as np
import pickle
import os
import urllib.request
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Local file configuration
DATA_URL = "https://archive.ics.uci.edu/ml/machine-learning-databases/undocumented/connectionist-bench/sonar/sonar.all-data"
DATA_FILENAME = "sonar.all-data"

def download_data_if_needed():
    if not os.path.exists(DATA_FILENAME):
        print(f"Downloading dataset from {DATA_URL}...")
        urllib.request.urlretrieve(DATA_URL, DATA_FILENAME)
        print("Download complete.")
    else:
        print("Dataset already exists locally.")

def run_pipeline() -> None:
    download_data_if_needed()
    
    # 1. Load dataset (no header present)
    df = pd.read_csv(DATA_FILENAME, header=None)
    
    # 2. Extract features X (first 60 columns) and target y (column index 60)
    X = df.iloc[:, :60]
    y = df.iloc[:, 60]
    
    # Map target: Mine (M) -> 1, Rock (R) -> 0
    y_mapped = y.map({'R': 0, 'M': 1})
    
    # 3. Train-test split (80/20 ratio)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_mapped, test_size=0.2, random_state=42
    )
    
    # 4. Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 5. Train Baseline Model (Logistic Regression)
    print("Training Logistic Regression baseline...")
    model = LogisticRegression(random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate baseline
    y_pred = model.predict(X_test_scaled)
    baseline_acc = accuracy_score(y_test, y_pred)
    print(f"Baseline Accuracy (60 features): {baseline_acc * 100:.2f}%")
    
    # 6. Save model and scaler objects using pickle
    with open("model.pkl", "wb") as f:
        pickle.dump(model, f)
    with open("scaler.pkl", "wb") as f:
        pickle.dump(scaler, f)
    print("Model and Scaler successfully saved to model.pkl and scaler.pkl.")

if __name__ == "__main__":
    run_pipeline()
