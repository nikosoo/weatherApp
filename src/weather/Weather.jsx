import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changeForecast, setChangeForecast] = useState(true);

  const fetchWeatherData = (city) => {
    setLoading(true);
    const apiKey = "02503a388bc5b7b7310d8c0eb06aede7";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(weatherApiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });

    axios
      .get(forecastApiUrl)
      .then((response) => {
        const forecastList = response.data.list;
        const dailyForecast = {};

        forecastList.forEach((forecast) => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toISOString().split("T")[0];

          if (!dailyForecast[day]) {
            dailyForecast[day] = {
              tempMin: forecast.main.temp_min,
              tempMax: forecast.main.temp_max,
              date: day,
              description: forecast.weather[0].description,
              icon: forecast.weather[0].icon,
              hourlyForecasts: [],
            };
          } else {
            dailyForecast[day].tempMin = Math.min(
              dailyForecast[day].tempMin,
              forecast.main.temp_min
            );
            dailyForecast[day].tempMax = Math.max(
              dailyForecast[day].tempMax,
              forecast.main.temp_max
            );
          }

          if (day === new Date().toISOString().split("T")[0]) {
            dailyForecast[day].hourlyForecasts.push(forecast);
          }
        });

        setForecastData(Object.values(dailyForecast));
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
        setLoading(false);
      });
  };

  const hourHandler = () => {
    setChangeForecast(true);
  };
  const dayHandler = () => {
    setChangeForecast(false);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={fetchWeatherData} />

      {loading && <p className="text-center my-4">Loading...test</p>}
      <div className="flex flex-col items-start mt-8">
        <div className="flex flex-col md:flex-row w-full justify-between">
          {weatherData && (
            <>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt={weatherData.weather[0].description}
                  className="self-center"
                />

                <div className="flex flex-col mt-6">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-100 ">
                    Weather in {weatherData.name}
                  </h2>
                  <div className="flex gap-4 md:gap-40">
                    <p className="text-2xl md:text-4xl mt-2 md:mt-7 text-gray-100">
                      {weatherData.main.temp}°C
                    </p>
                  </div>
                  <p className="text-2xl md:text-4xl text-gray-100">
                    {weatherData.weather[0].description
                      .charAt(0)
                      .toUpperCase() +
                      weatherData.weather[0].description.slice(1)}
                  </p>
                </div>
              </div>
              <div className="bg-gray-700 bg-opacity-50 p-6 rounded-md shadow-md my-6 w-full md:w-72 text-xl text-gray-100">
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                <p>Pressure: {weatherData.main.pressure} hPa</p>
                <p>
                  Sunrise:{" "}
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}
                </p>
                <p>
                  Sunset:{" "}
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </>
          )}
        </div>

        {weatherData && (
          <>
            <div className="container mx-auto p-6 bg-gray-800 shadow-lg bg-opacity-70 mt-20 md:mt-40 rounded-lg">
              <div className="flex gap-4 justify-center md:justify-start">
                <button
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  onClick={hourHandler}
                >
                  Hourly forecast
                </button>
                <button
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  onClick={dayHandler}
                >
                  Daily forecast
                </button>
              </div>

              {changeForecast && (
                <div>
                  {forecastData && forecastData.length > 0 && (
                    <div className="w-full mt-4">
                      <h2 className="text-xl font-bold mb-4 text-gray-100 text-center md:text-left">
                        Hourly Forecast for Today
                      </h2>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {forecastData[0].hourlyForecasts.map(
                          (hourlyForecast, index) => (
                            <div
                              key={index}
                              className="bg-gray-800 p-4 rounded-lg shadow-md w-40 md:w-56 flex flex-col items-center"
                            >
                              <p className="text-gray-200">
                                {new Date(
                                  hourlyForecast.dt * 1000
                                ).toLocaleTimeString()}
                              </p>
                              <img
                                className="mt-2"
                                src={`https://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png`}
                                alt={hourlyForecast.weather[0].description}
                              />
                              <p className="text-gray-300">
                                {hourlyForecast.weather[0].description
                                  .charAt(0)
                                  .toUpperCase() +
                                  hourlyForecast.weather[0].description.slice(
                                    1
                                  )}
                              </p>
                              <p className="text-gray-400">
                                Temperature: {hourlyForecast.main.temp}°C
                              </p>
                              <p className="text-gray-400">
                                Feels like: {hourlyForecast.main.feels_like}°C
                              </p>
                              <p className="text-gray-400">
                                Humidity: {hourlyForecast.main.humidity}%
                              </p>
                              <p className="text-gray-400">
                                Wind Speed: {hourlyForecast.wind.speed} m/s
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!changeForecast && forecastData && (
                <div className="w-full mt-4">
                  <h2 className="text-xl font-bold mb-4 text-gray-100 text-center md:text-left">
                    5-Day Forecast
                  </h2>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {forecastData.slice(1).map((forecast, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 p-4 rounded-lg shadow-md w-40 md:w-56 flex flex-col items-center"
                      >
                        <p className="font-bold text-gray-200">
                          {forecast.date}
                        </p>
                        <img
                          className="mt-2"
                          src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                          alt={forecast.description}
                        />
                        <p className="text-gray-300">
                          {forecast.description.charAt(0).toUpperCase() +
                            forecast.description.slice(1)}
                        </p>
                        <p className="text-gray-400">
                          High: {forecast.tempMax}°C
                        </p>
                        <p className="text-gray-400">
                          Low: {forecast.tempMin}°C
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
