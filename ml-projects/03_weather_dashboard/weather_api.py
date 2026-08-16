# 🌦️ Live Weather Dashboard — API Module
# File: D:\DA + DE\PYTHON_PROJECTS\03_weather_dashboard\weather_api.py
import requests

def fetch_weather(city):
    """
    Fetches live weather data from the OpenWeatherMap API for a given city name.

    Parameters:
    city (str): Name of the city (e.g. "London", "Tokyo").

    Returns:
    dict: A dictionary containing parsed weather JSON data.
    """
    api_key = "d33bb62ec542dd638c378455c1ddde76"
    # Using the city name query parameter (q=) instead of latitude and longitude
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error fetching weather data: {response.status_code}")

def parse_weather(weather_data):
    """
    Parses the raw weather data fetched from the API.

    Parameters:
    weather_data (dict): The raw weather data dictionary.

    Returns:
    dict: A dictionary containing parsed weather metrics.
    """
    weather_info = {
        "city": weather_data["name"],
        "country": weather_data["sys"]["country"],
        "temperature": weather_data["main"]["temp"],
        "humidity": weather_data["main"]["humidity"],
        "pressure": weather_data["main"]["pressure"],
        "weather_description": weather_data["weather"][0]["description"],
        "wind_speed": weather_data["wind"]["speed"]
    }
    
    return weather_info
