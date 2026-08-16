# 🌦️ Live Weather Dashboard
# File: D:\DA + DE\PYTHON_PROJECTS\03_weather_dashboard\weather.py
# Write the code yourself from memory!

import requests
import json
import pandas as pd
import pytest

def fetch_weather(lat, lon):
    """
    Fetches weather data from the OpenWeatherMap API for the given latitude and longitude.

    Parameters:
    lat (float): Latitude of the location.
    lon (float): Longitude of the location.

    Returns:
    dict: A dictionary containing weather data.
    """
    api_key = "d33bb62ec542dd638c378455c1ddde76"  # Replace with your actual API key
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error fetching weather data: {response.status_code}")
    
def parse_weather(fetch_weather):
    """
    Parses the weather data fetched from the API.

    Parameters:
    fetch_weather (dict): The weather data dictionary.

    Returns:
    dict: A dictionary containing parsed weather information.
    """
    weather_info = {
        "temperature": fetch_weather["main"]["temp"],
        "humidity": fetch_weather["main"]["humidity"],
        "pressure": fetch_weather["main"]["pressure"],
        "weather_description": fetch_weather["weather"][0]["description"],
        "wind_speed": fetch_weather["wind"]["speed"]
    }
    
    return weather_info
