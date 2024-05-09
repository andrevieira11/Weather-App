module WeatherHelper
    def fetch_weather_data(lat, long, start_date, end_date)
        return HTTParty.get("https://archive-api.open-meteo.com/v1/archive?latitude=#{lat}&longitude=#{long}&start_date=#{start_date}&end_date=#{end_date}&hourly=temperature_2m&hourly=relative_humidity_2m&hourly=rain")
    end
    
    def fetch_save_weather_data(location, lat, long, start_date, end_date)
        weather_response = fetch_weather_data(lat, long, start_date, end_date)
        
        time_data = weather_response["hourly"]["time"]
        rain_data = weather_response["hourly"]["rain"]
        humidity_data = weather_response["hourly"]["relative_humidity_2m"]
        temperature_data = weather_response["hourly"]["temperature_2m"]
    
        weather_data_entries = []
        time_data.each_with_index do |time, i|
            weather_data_entries << {
                location: location,
                time: time,
                rain: rain_data[i],
                temperature: temperature_data[i],
                humidity: humidity_data[i]
            }
        end
        WeatherData.create(weather_data_entries)
    
        return {
            time_data: time_data,
            rain_data: rain_data,
            temperature_data: temperature_data,
            humidity_data: humidity_data
        }
    end
end
