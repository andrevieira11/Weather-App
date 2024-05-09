class WeatherData < ApplicationRecord
    self.primary_key = [:location, :time]
    
    attribute :location, :string
    attribute :temperature, :decimal
    attribute :rain, :decimal
    attribute :humidity, :integer
    attribute :time, :datetime
end
