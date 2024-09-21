import { useState, useEffect, useContext } from "react";
import { CityContext } from "../context/cityContext";
import styles from "../styles/PinWidget.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { TemperatureUnitContext } from "../context/temperatureUnitContext";

export default function PinnedCityWidget({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const { updateCurrentCity, unpinCity } = useContext(CityContext);
  const { unit } = useContext(TemperatureUnitContext);

  const handleWidgetClick = (city) => {
    updateCurrentCity(city);
    //if width is for mobile, close sidebar
    if (window.innerWidth < 768) {
      document.getElementById("sidebar").style.transform = "translateX(100%)";
    }
  };


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/weather/${city}?units=${unit}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  }, [unit, city]);

  return (
    <>
      {weatherData && (
        <div className={styles.pinWidget}>
          <div className={styles.pinWidgetRibbon}>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="weather icon"
            />
            <span onClick={() => handleWidgetClick(city)}>
              {weatherData.name}
            </span>
            <button onClick={() => unpinCity(city)}>
              <ClearIcon fontSize="small" />
            </button>
          </div>
          <div
            className={styles.pinWidgetWeather}
            onClick={() => handleWidgetClick(city)}
          >
            <div className={styles.pinWidgetLeft}>
              <div className={styles.pinWidgetTemp}>
                {Math.round(weatherData.main.temp)}°{unit === "metric" ? "C" : "F"}
              </div>
              <div className={styles.pinWidgetWeatherDesc}>
                {weatherData.weather[0].description}
              </div>
            </div>
            <div className={styles.pinWidgetRight}>
              <div className={styles.pinWidgetHumidity}>
                Humidity: {weatherData.main.humidity}%
              </div>
              <div className={styles.pinWidgetWind}>
                Wind: {weatherData.wind.speed}{unit === "metric" ? "m/s" : "mph"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
