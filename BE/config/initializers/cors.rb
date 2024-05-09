Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3001'  # Replace with the origin of your frontend application
  
      resource '/location_suggestion', headers: :any, methods: [:get]
      resource '/weather_data', headers: :any, methods: [:get]
    end
  end
  