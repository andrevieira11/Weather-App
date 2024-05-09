class CreateWeatherData < ActiveRecord::Migration[7.1]
  def change
    create_table :weather_data, id: false do |t|
      t.string :location
      t.decimal :temperature
      t.decimal :rain
      t.integer :humidity
      t.datetime :time

      t.timestamps
    end
    add_index :weather_data, [:location, :time], unique: true
  end
end
