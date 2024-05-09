require "test_helper"

class WeatherControllerTest < ActionDispatch::IntegrationTest
  test "should get get_weather_data" do
    get weather_get_weather_data_url
    assert_response :success
  end
end
