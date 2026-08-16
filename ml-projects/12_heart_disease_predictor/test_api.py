import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_prediction():
    payload = {
        "age": 63,
        "sex": 1,
        "cp": 3,
        "trestbps": 145,
        "chol": 233,
        "fbs": 1,
        "restecg": 0,
        "thalach": 150,
        "exang": 0,
        "oldpeak": 2.3,
        "slope": 0,
        "ca": 0,
        "thal": 1
    }
    
    print("Testing Heart Disease Triage prediction endpoint...")
    response = requests.post(f"{BASE_URL}/predict", json=payload)
    print(f"Response Status: {response.status_code}")
    print(f"Response Body:\n{json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    test_prediction()
