# 🧪 Live Test Client for Sonar Predictor API
# File: D:\DA + DE\PYTHON_PROJECTS\08_sonar_predictor\test_api.py
import requests
import time

BASE_URL = "http://127.0.0.1:8000"

print("Waiting for server to initialize...")
time.sleep(2)

# 60 features representing a standard sonar frequency return signature
dummy_sonar_features = [
    0.0200, 0.0371, 0.0428, 0.0207, 0.0954, 0.0986, 0.1539, 0.1601, 0.3109, 0.2111,
    0.1609, 0.1582, 0.2238, 0.0645, 0.0660, 0.2273, 0.3100, 0.2999, 0.5078, 0.4797,
    0.5737, 0.6190, 0.6013, 0.5280, 0.5971, 0.7685, 0.9016, 0.9377, 1.0000, 0.9276,
    0.7300, 0.5362, 0.3707, 0.4654, 0.5741, 0.7336, 0.7931, 0.7497, 0.4990, 0.3672,
    0.2272, 0.2980, 0.2100, 0.1495, 0.1011, 0.0521, 0.0417, 0.0478, 0.0300, 0.0112,
    0.0027, 0.0065, 0.0159, 0.0072, 0.0167, 0.0180, 0.0084, 0.0090, 0.0032, 0.0020
]

payload = {
    "features": dummy_sonar_features
}

print("Sending sonar payload to /predict endpoint...")
try:
    res = requests.post(f"{BASE_URL}/predict", json=payload)
    print("Response Status Code:", res.status_code)
    print("Response Body:", res.json())
except Exception as e:
    print("[Error] Failed to connect to server. Is Uvicorn running on port 8000?", e)
