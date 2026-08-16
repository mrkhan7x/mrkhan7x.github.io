# 🧪 Live Test Client for SVM Diabetes Predictor API
# File: D:\DA + DE\PYTHON_PROJECTS\09_diabetes_svm_predictor\test_api.py
import requests
import time

BASE_URL = "http://127.0.0.1:8000"

print("Waiting for server to initialize...")
time.sleep(2)

# Sample PIMA clinical metrics (Corresponds to non-diabetic case)
patient_payload = {
    "Pregnancies": 1,
    "Glucose": 89,
    "BloodPressure": 66,
    "SkinThickness": 23,
    "Insulin": 94,
    "BMI": 28.1,
    "DiabetesPedigreeFunction": 0.167,
    "Age": 21
}

print("Sending patient payload to /predict endpoint...")
try:
    res = requests.post(f"{BASE_URL}/predict", json=patient_payload)
    print("Response Status Code:", res.status_code)
    print("Response Body:", res.json())
except Exception as e:
    print("[Error] Failed to connect to server. Is Uvicorn running on port 8000?", e)
