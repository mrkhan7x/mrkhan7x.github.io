import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, recall_score, classification_report

def train():
    # 1. Download/Load Heart Disease Dataset
    url = "https://raw.githubusercontent.com/dhrupad17/Heart-Disease-Prediction/main/heart_disease_data.csv"
    print("Loading Heart Disease dataset...")
    df = pd.read_csv(url)
    
    # 2. Extract Features & Target
    X = df.drop(columns=['target'])
    y = df['target']
    
    # 3. Train/Test Split (80/20 split, stratified)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=2)
    
    # 4. Standard Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 5. Model Training
    print("Training LogisticRegression model...")
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_scaled, y_train)
    
    # 6. Evaluation
    y_pred_train = model.predict(X_train_scaled)
    y_pred_test = model.predict(X_test_scaled)
    
    train_acc = accuracy_score(y_train, y_pred_train)
    test_acc = accuracy_score(y_test, y_pred_test)
    test_recall = recall_score(y_test, y_pred_test)
    
    print("\n=== Model Performance ===")
    print(f"Training Accuracy : {train_acc * 100:.2f}%")
    print(f"Testing Accuracy  : {test_acc * 100:.2f}%")
    print(f"Recall (Sens.)    : {test_recall * 100:.2f}%")
    
    # 7. Coefficients Analysis
    coef_df = pd.DataFrame({
        'Feature': X.columns,
        'Coefficient': model.coef_[0]
    }).sort_values(by='Coefficient', ascending=False)
    
    print("\n=== Clinical Risk Factor Coefficients ===")
    for _, row in coef_df.iterrows():
        print(f"{row['Feature']:10s}: {row['Coefficient']:+.4f}")
        
    # 8. Save model and scaler
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "model.pkl")
    scaler_path = os.path.join(base_dir, "scaler.pkl")
    
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
    with open(scaler_path, "wb") as f:
        pickle.dump(scaler, f)
        
    print(f"\nModel and Scaler successfully saved to: {base_dir}")

if __name__ == "__main__":
    train()
