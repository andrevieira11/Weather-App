require 'uri'

module LocationHelper
    def fetch_location_coordinates(location)
        encoded_location = URI.encode_www_form_component(location)
        return HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?address=#{encoded_location}&key=AIzaSyC3aaOPMrHvR1-OL-rqFCOtZba5sRhn7F8")
    end
end
