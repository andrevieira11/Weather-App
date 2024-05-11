require 'httparty'

class LocationController < ApplicationController
  def get_location_suggestion
    #parameters
    location = params[:location]

    response = HTTParty.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=#{location}&types=(cities)&key=AIzaSyC3aaOPMrHvR1-OL-rqFCOtZba5sRhn7F8")

    if response["status"] == "OK"
      predictions = response["predictions"]
      main_texts = predictions.map { |prediction| prediction["structured_formatting"]["main_text"] }
      description = predictions.map { |prediction| prediction["description"] }
      render json: description
    else
      puts "There was an error finding the location"
    end
  end
end