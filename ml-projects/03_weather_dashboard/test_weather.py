# 🧪 Automated Tests for Weather Dashboard
# File: D:\DA + DE\PYTHON_PROJECTS\03_weather_dashboard\test_weather.py
import pytest
from weather_api import fetch_weather, parse_weather

def test_fetch_weather_valid_city():
    # Test that querying a real city returns correct structure and data
    data = fetch_weather("London")
    assert isinstance(data, dict)
    assert data["name"] == "London"
    assert "main" in data
    assert "temp" in data["main"]

def test_fetch_weather_invalid_city():
    # Test that an invalid city name correctly raises an exception
    with pytest.raises(Exception):
        fetch_weather("NonExistentCityXYZ")

def test_parse_weather():
    # Test that our parsing logic correctly extracts metrics
    raw_data = fetch_weather("London")
    parsed = parse_weather(raw_data)
    
    assert isinstance(parsed, dict)
    assert parsed["city"] == "London"
    assert parsed["country"] == "GB"
    assert isinstance(parsed["temperature"], float) or isinstance(parsed["temperature"], int)
    assert "humidity" in parsed
    assert "pressure" in parsed
    assert "weather_description" in parsed
    assert "wind_speed" in parsed
