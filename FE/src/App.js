import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import DatePickerInput from './components/common/DatePickerInput';
import ChartComponent from './components/common/ChartComponent';
import { MONTH_MAP } from './constants/MONTH_ENUM';
import TableComponent from './components/common/TableComponent';

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [locationData, setLocationData] = useState("");
  const [timeData, setTimeData] = useState([]);
  const [rainData, setRainData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [tempData, setTempData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async (inputValue) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/location_suggestion?location=${inputValue}`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestion = await fetchSuggestions(value)
    setSuggestions(suggestion)
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion;

  const renderSuggestion = suggestion => (
    <div className='cursor-pointer bg-cyan-400 rounded-lg mb-2 px-2'>
      {suggestion}
    </div>
  );

  const setInputStartDate = (inputStartDate) => {
    if (!!endDate) {
      if (endDate < inputStartDate) {
        setStartDate(endDate)
        setEndDate(inputStartDate)
        return;
      }
    }
    setStartDate(inputStartDate)
  }

  const setInputEndDate = (inputEndDate) => {
    if (!!startDate) {
      if (startDate > inputEndDate) {
        setEndDate(startDate)
        setStartDate(inputEndDate)
        return;
      }
    }
    setEndDate(inputEndDate)
  }

  const handleSend = async () => {
    const startDateParts = startDate.toString().split(' ');
    const endDateParts = endDate.toString().split(' ');
    const data = {
      location: value,
      start_date: `${startDateParts[3]}-${MONTH_MAP[startDateParts[1]]}-${startDateParts[2]}`,
      end_date: `${endDateParts[3]}-${MONTH_MAP[endDateParts[1]]}-${endDateParts[2]}`
    }
    setLoading(true)
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/weather_data`, {
        params: data
      })
      if (response.status === 200) {
        setTimeData(response.data.hourly.time)
        setTempData(response.data.hourly.temperature_2m)
        setRainData(response.data.hourly.rain)
        setHumidityData(response.data.hourly.relative_humidity_2m)
        setLocationData(value)
        setError("")
      }
    } catch (e) {
      setError(e.response.data)
      setTimeData([])
      setTempData([])
      setRainData([])
      setHumidityData([])
    }
    setLoading(false)
  }

  const inputProps = {
    className: 'outline outline-offset-2 outline-1 mb-2',
    placeholder: 'Type a city',
    value,
    onChange: onChange
  };
  return (
    <div className='flex flex-col'>
      <div className='flex text-4xl text-blue-400 justify-center'>'Weathering with you' React App</div>
      <div className='flex flex-row my-16 space-x-32 justify-center'>
        <div className='flex flex-col'>
          <DatePickerInput title={'Select Start Date:'} value={startDate} setValue={setInputStartDate} />
        </div>
        <div className='flex flex-col'>
          <DatePickerInput title={'Select End Date:'} value={endDate} setValue={setInputEndDate} />
        </div>
      </div>
      <div className='flex justify-center mb-10'>
        <button
          className={(loading ? "" : "hover:bg-blue-600 ") + "bg-blue-400 p-2 rounded-lg"}
          onClick={loading ? () => { } : handleSend}>
          {loading ? "Loading..." : "Get weather data"}
        </button>
      </div>
      <div className='flex flex-col items-center'>
        <h2>Select Location:</h2>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
      <div>
        {timeData?.length > 0 && (
          <div className='flex flex-col justify-center items-center'>
            <div className='flex w-1/2 justify-center'>
              <ChartComponent timeData={timeData} rainData={rainData} tempData={tempData} humidityData={humidityData} />
            </div>
            <div className='flex justify-center'>
              <TableComponent location={locationData} timeData={timeData} rainData={rainData} tempData={tempData} humidityData={humidityData} />
            </div>
          </div>
        )}
        {error.length > 0 && (
          <div className='flex text-2xl text-red-400 justify-center'>{error}</div>
        )}
      </div>
    </div >
  );
}

export default App;
