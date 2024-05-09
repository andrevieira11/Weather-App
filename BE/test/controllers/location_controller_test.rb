require "test_helper"

class LocationControllerTest < ActionDispatch::IntegrationTest
  test "should get locationSuggestion" do
    get location_locationSuggestion_url
    assert_response :success
  end
end
