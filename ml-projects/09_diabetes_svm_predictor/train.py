# 🩺 SVM PIMA Diabetes Predictor — Training Pipeline
# File: D:\DA + DE\PYTHON_PROJECTS\09_diabetes_svm_predictor\train.py
import pandas as pd
import numpy as np
import pickle
import os
import urllib.request
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

DATA_URL = "https://raw.githubusercontent.com/plotly/datasets/master/diabetes.csv"
DATA_FILENAME = "diabetes.csv"

def download_data_if_needed():
    if not os.path.exists(DATA_FILENAME):
        print(f"Downloading PIMA Diabetes dataset...")
        urllib.request.urlretrieve(DATA_URL, DATA_FILENAME)
        print("Download complete.")
    else:
        print("Dataset already exists locally.")

def run_pipeline() -> None:
    download_data_if_needed()
    
    # 1. Load dataset
    df = pd.read_csv(DATA_FILENAME)
    
    # 2. Extract features and target
    X = df.drop(columns='Outcome', axis=1)
    y = df['Outcome']
    
    # 3. Train-test split (80/20 split, stratified, random_state=2)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=2
    )
    
    # 4. Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 5. Train SVM model with linear kernel and probability=True
    # NOTE: probability=True is required to call predict_proba() in FastAPI!
    print("Training Linear Support Vector Machine...")
    model = SVC(kernel='linear', probability=True, random_state=2)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate model
    y_pred_train = model.predict(X_train_scaled)
    y_pred_test = model.predict(X_test_scaled)
    
    print(f"Training Accuracy: {accuracy_score(y_train, y_pred_train) * 100:.2f}%")
    print(f"Testing Accuracy:  {accuracy_score(y_test, y_pred_test) * 100:.2f}%")
    
    # Under-the-hood inspections (Step 2 details)
    weights = model.coef_[0]
    feature_importance = pd.Series(np.abs(weights), index=X.columns).sort_values(ascending=False)
    print("\n--- Feature Importance (Hyperplane Weights Magnitude) ---")
    for feat, weight in feature_importance.items():
        print(f"{feat:<25} : {weight:.4f}")
        
    print(f"\nTotal Support Vectors trained: {len(model.support_)}")
    print(f"Support Vectors per class (0, 1): {model.n_support_}")
    
    # 6. Save model and scaler objects using pickle
    with open("model.pkl", "wb") as f:
        pickle.dump(model, f)
    with open("scaler.pkl", "wb") as f:
        pickle.dump(scaler, f)
    print("\nModel and Scaler successfully saved to model.pkl and scaler.pkl.")

if __name__ == "__main__":
    run_pipeline()
