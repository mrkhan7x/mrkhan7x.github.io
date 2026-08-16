# 🧪 API Client Test Script
# File: D:\DA + DE\PYTHON_PROJECTS\04_fastapi_api\test_api_client.py
import requests
import time

BASE_URL = "http://127.0.0.1:8000"

print("Waiting 2 seconds for server to fully initialize...")
time.sleep(2)

print("\n--- Test 1: Fetching Tasks (Initial) ---")
try:
    res = requests.get(f"{BASE_URL}/tasks")
    print("GET /tasks:", res.status_code, res.json())
except Exception as e:
    print("Server connection failed. Make sure Uvicorn is running!", e)
    exit(1)

print("\n--- Test 2: Creating a Task ---")
new_task = {"title": "Master FastAPI Backend Development"}
res = requests.post(f"{BASE_URL}/tasks", json=new_task)
print("POST /tasks:", res.status_code, res.json())

print("\n--- Test 3: Fetching Tasks (After Adding) ---")
res = requests.get(f"{BASE_URL}/tasks")
tasks = res.json()
print("GET /tasks:", res.status_code, tasks)

# Extract the ID of the task we just added
task_id = tasks[-1]["id"]

print(f"\n--- Test 4: Completing Task (ID: {task_id}) ---")
res = requests.put(f"{BASE_URL}/tasks/{task_id}")
print(f"PUT /tasks/{task_id}:", res.status_code, res.json())

print("\n--- Test 5: Fetching Tasks (Verify Completion) ---")
res = requests.get(f"{BASE_URL}/tasks")
print("GET /tasks:", res.status_code, res.json())

print(f"\n--- Test 6: Deleting Task (ID: {task_id}) ---")
res = requests.delete(f"{BASE_URL}/tasks/{task_id}")
print(f"DELETE /tasks/{task_id}:", res.status_code, res.json())

print("\n--- Test 7: Fetching Tasks (Verify Deletion) ---")
res = requests.get(f"{BASE_URL}/tasks")
print("GET /tasks:", res.status_code, res.json())
