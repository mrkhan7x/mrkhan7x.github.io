# 🧪 Live Test Client for Diabetes Predictor API
# File: D:\DA + DE\PYTHON_PROJECTS\06_diabetes_predictor\test_api.py
import requests
import time

BASE_URL = "http://127.0.0.1:8000"

print("Waiting 2 seconds for server to initialize...")
time.sleep(2)

patient_data = {
    "time_in_hospital": 5,
    "num_lab_procedures": 45,
    "num_procedures": 2,
    "num_medications": 15,
    "number_diagnoses": 9
}

print("Sending patient data to /predict endpoint...")
try:
    res = requests.post(f"{BASE_URL}/predict", json=patient_data)
    print("Response Status Code:", res.status_code)
    print("Response Body:", res.json())
except Exception as e:
    print("[Error] Failed to connect to server. Is Uvicorn running on port 8000?", e)
