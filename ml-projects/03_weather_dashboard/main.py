# 🌦️ Live Weather Dashboard — CLI Interface
# File: D:\DA + DE\PYTHON_PROJECTS\03_weather_dashboard\main.py
from weather_api import fetch_weather, parse_weather

def display_weather(weather):
    """
    Prints a formatted, visually clean dashboard of the weather metrics.
    """
    print("\n--- Weather Dashboard ---")
    print(f"City:        {weather['city']}")
    print(f"Country:     {weather['country']}")
    print(f"Temperature: {weather['temperature']}°C")
    print(f"Humidity:    {weather['humidity']}%")
    print(f"Pressure:    {weather['pressure']} hPa")
    print(f"Description: {weather['weather_description']}")
    print(f"Wind Speed:  {weather['wind_speed']} m/s")

def main():
    print("Welcome to the Live Weather Dashboard!")
    
    while True:
        city = input("\nEnter city name (or type 'exit' to quit): ").strip()
        
        if city.lower() == 'exit':
            print("Goodbye!")
            break
            
        if not city:
            continue
            
        try:
            # 1. Fetch raw data from API
            raw_data = fetch_weather(city)
            # 2. Parse raw data into clean dictionary
            parsed_data = parse_weather(raw_data)
            # 3. Display the formatted weather dashboard
            display_weather(parsed_data)
        except Exception as e:
            # Print the error message cleanly
            print(f"[Error] {e}")

if __name__ == "__main__":
    main()
