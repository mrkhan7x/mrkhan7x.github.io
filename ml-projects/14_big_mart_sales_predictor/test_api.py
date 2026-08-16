import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_sales_prediction():
    payload = {
        "Item_Identifier": "FDA15",
        "Item_Weight": 9.30,
        "Item_Fat_Content": "Low Fat",
        "Item_Visibility": 0.016047,
        "Item_Type": "Dairy",
        "Item_MRP": 249.8092,
        "Outlet_Identifier": "OUT049",
        "Outlet_Size": "Medium",
        "Outlet_Location_Type": "Tier 1",
        "Outlet_Type": "Supermarket Type1",
        "Outlet_Age": 14
    }
    
    print("Testing Big Mart Sales Forecasting API endpoint...")
    response = requests.post(f"{BASE_URL}/predict", json=payload)
    print(f"Response Status: {response.status_code}")
    print(f"Response Body:\n{json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    test_sales_prediction()
