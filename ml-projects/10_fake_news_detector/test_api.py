# 🧪 Live Test Client for Fake News Predictor API
# File: D:\DA + DE\PYTHON_PROJECTS\10_fake_news_detector\test_api.py
import requests
import time

BASE_URL = "http://127.0.0.1:8000"

print("Waiting for server to initialize...")
time.sleep(2)

# Sample payloads
reliable_news = {
    "title": "Donald Trump Signs Executive Order on Immigration Reform",
    "author": "Jerome Hudson" # High negative coefficient author
}

unreliable_news = {
    "title": "Hillary Clinton Classified Email Leak Exposed in Secret Video",
    "author": "Admin" # High positive coefficient author/word
}

print("Testing RELIABLE news prediction...")
try:
    res = requests.post(f"{BASE_URL}/predict", json=reliable_news)
    print("Response Status:", res.status_code)
    print("Response Body:", res.json())
except Exception as e:
    print("[Error] Failed to connect for reliable news test.", e)

print("\nTesting UNRELIABLE news prediction...")
try:
    res = requests.post(f"{BASE_URL}/predict", json=unreliable_news)
    print("Response Status:", res.status_code)
    print("Response Body:", res.json())
except Exception as e:
    print("[Error] Failed to connect for unreliable news test.", e)
