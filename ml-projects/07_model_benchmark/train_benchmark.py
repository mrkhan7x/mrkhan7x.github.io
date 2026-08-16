# 🌲 Model Benchmarking: Decision Trees, Random Forests, & XGBoost
# File: D:\DA + DE\PYTHON_PROJECTS\07_model_benchmark\train_benchmark.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from xgboost import XGBClassifier

# Updated DATA_PATH for Colab environment
DATA_PATH = "D:/DA + DE/LEARNING/diabetic_data.csv"

def load_data():
    print("Loading dataset...")
    df = pd.read_csv(DATA_PATH)
    features = [
        "time_in_hospital",
        "num_lab_procedures",
        "num_procedures",
        "num_medications",
        "number_diagnoses"
    ]
    X = df[features]
    y = (df["readmitted"] == "<30").astype(int)

    # Split train/test (80/20)
    return train_test_split(X, y, test_size=0.2, random_state=42)

def evaluate_model(name, y_true, y_pred):
    """
    Utility function to print and return classification metrics.
    """
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)

    print(f"\n--- {name} Results ---")
    print(f"Accuracy:  {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall:    {rec:.4f}")
    print(f"F1-Score:  {f1:.4f}")
    return {"Accuracy": acc, "Precision": prec, "Recall": rec, "F1-Score": f1}

if __name__ == "__main__":
    X_train, X_test, y_train, y_test = load_data()

    # NOTE: Tree-based models DO NOT require feature scaling (standardization)!
    # This is a major advantage of trees over Logistic Regression/Neural Networks.

    # YOUR TASK 1: Initialize and train a DecisionTreeClassifier
    # Use max_depth=5 and random_state=42.
    print("\nTraining Decision Tree...")
    dt_model = DecisionTreeClassifier(max_depth=5, random_state=42)
    dt_model.fit(X_train, y_train)

    # YOUR TASK 2: Initialize and train a RandomForestClassifier
    # Use n_estimators=100, max_depth=5, and random_state=42.
    print("Training Random Forest...")
    rf_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    rf_model.fit(X_train, y_train)

    # YOUR TASK 3: Initialize and train an XGBClassifier (XGBoost)
    # Use n_estimators=100, max_depth=5, random_state=42, and eval_metric='logloss'.
    print("Training XGBoost...")
    xgb_model = XGBClassifier(n_estimators=100, max_depth=5, random_state=42, eval_metric='logloss', use_label_encoder=False)
    xgb_model.fit(X_train, y_train)

    # Evaluate models if trained
    if dt_model is not None:
        evaluate_model("Decision Tree", y_test, dt_model.predict(X_test))
    if rf_model is not None:
        evaluate_model("Random Forest", y_test, rf_model.predict(X_test))
    if xgb_model is not None:
        evaluate_model("XGBoost", y_test, xgb_model.predict(X_test))
