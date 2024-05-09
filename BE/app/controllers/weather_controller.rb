class WeatherController < ApplicationController
  include WeatherHelper
  def get_weather_data
    #parameters
    location = params[:location]
    start_date = params[:start_date]
    end_date = params[:end_date]

    results_time_array = []
    results_rain_array = []
    results_temperature_array = []
    results_humidity_array = []

    location_response = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{location}&key=AIzaSyC3aaOPMrHvR1-OL-rqFCOtZba5sRhn7F8")
    lat = 0
    long = 0
    if location_response["status"] == "OK"
      lat = location_response["results"][0]["geometry"]["location"]["lat"]
      long = location_response["results"][0]["geometry"]["location"]["lng"]
    end

    parsed_start_time = DateTime.parse(start_date)
    parsed_end_time = DateTime.parse(end_date) + 23.hour # We want the whole day not just until time 00h of end_time

    weather_data_db = WeatherData.where(location: location, time: parsed_start_time..parsed_end_time).order(:time)

    if !weather_data_db.empty?
      if parsed_start_time < weather_data_db.first.time
        weather_data = fetch_save_weather_data(location, lat, long, start_date, (weather_data_db.first.time.prev_day).strftime("%Y-%m-%d"))
      end
      if parsed_end_time > weather_data_db.last.time
        weather_data = fetch_save_weather_data(location, lat, long, (weather_data_db.last.time + 1.hour).strftime("%Y-%m-%d"), end_date)
      end

      # Find data in missing intervals between the given dates
      wdtime = weather_data_db.pluck(:time).map(&:to_date)
      start_temp_date = nil
      (parsed_start_time..parsed_end_time).each do |date|
        if !wdtime.include?(date)
          start_temp_date ||= date
        elsif start_temp_date
          weather_data = fetch_save_weather_data(location, lat, long, (start_temp_date).strftime("%Y-%m-%d"), (date-1).strftime("%Y-%m-%d"))
          start_temp_date = nil
        end
      end


      results_time_array = weather_data_db.pluck(:time)
      results_rain_array = weather_data_db.pluck(:rain)
      results_temperature_array = weather_data_db.pluck(:temperature)
      results_humidity_array = weather_data_db.pluck(:humidity)
    else
      weather_data = fetch_save_weather_data(location, lat, long, start_date, end_date)

      results_time_array = weather_data[:time_data]
      results_rain_array = weather_data[:rain_data]
      results_temperature_array = weather_data[:temperature_data]
      results_humidity_array = weather_data[:humidity_data]
    end

    data = {
      hourly: {
        time: results_time_array,
        rain: results_rain_array,
        temperature_2m: results_temperature_array,
        relative_humidity_2m: results_humidity_array
      }
    }
    render json: data
  end
end
