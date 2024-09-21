import React from "react";
import styles from "../styles/Dashboard.module.css";

const Forecast = ({ weatherData, unit }) => {

  const getForecastWidgets = () => {
    const dailyForecastIndices = [0, 8, 16, 24, 32];

    return dailyForecastIndices.map((index) => (
      <div className={styles.forecastWidget} key={index}>
        <div className={styles.forecastWidgetDate}>
          {weatherData && weatherData.list[index].dt_txt.split(" ")[0]}
        </div>
        <div className={styles.forecastWidgetData}>
          <div className={styles.forecastWidgetCell}>
            Cast: &nbsp;
            <span>
              {weatherData && weatherData.list[index].weather[0].main}
            </span>
          </div>
          <div className={styles.forecastWidgetCell}>
            Min Temp:&nbsp;
            <span>
              {weatherData && weatherData.list[index].main.temp_min} °
              {unit === "metric" ? "C" : "F"}
            </span>
          </div>
          <div className={styles.forecastWidgetCell}>
            Max Temp:&nbsp;
            <span>
              {weatherData && weatherData.list[index].main.temp_max} °
              {unit === "metric" ? "C" : "F"}
            </span>
          </div>
          {/* <div className={styles.forecastWidgetCell}>
            Humidity: &nbsp;
            <span>{weatherData && weatherData.list[index].main.humidity}%</span>
          </div> */}
          <div className={styles.forecastWidgetCell}>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.list[index].weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className={styles.tabsRibbon}>
        <span>5-Day Forecast</span>
      </div>
      <div className={styles.widgetRow}>
        <div className={styles.forecastContainer}>{getForecastWidgets()}</div>
      </div>
    </>
  );
};

export default Forecast;
