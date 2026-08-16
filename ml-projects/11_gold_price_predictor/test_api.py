import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_prediction():
    payload = {
        "SPX": 1447.16,
        "USO": 78.47,
        "SLV": 15.18,
        "EUR/USD": 1.471692
    }
    
    print("Testing Gold Price prediction endpoint...")
    response = requests.post(f"{BASE_URL}/predict", json=payload)
    print(f"Response Status: {response.status_code}")
    print(f"Response Body: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    test_prediction()
