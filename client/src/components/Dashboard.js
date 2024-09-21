import { useState, useEffect, useContext } from "react";
import { CityContext } from "../context/cityContext";
import styles from "../styles/Dashboard.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import Forecast from "./Forecast";
import InfoWidgets from "./InfoWidget";
import { TemperatureUnitContext } from "../context/temperatureUnitContext";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function Dashboard(props) {
  const { currentCity } = useContext(CityContext);
  const { unit } = useContext(TemperatureUnitContext);
  const [weatherData, setWeatherData] = useState(null);

  const dayData = {
    //labels are first 8 time in IST hrs format taken from the 5 day forecast data
    labels:
      weatherData &&
      weatherData.list
        .map((item) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          return `${hours}:${minutes}`;
        })
        .slice(0, 9),
    datasets: [
      {
        label: "Temperature",
        data:
          weatherData &&
          weatherData.list
            .map((item) => {
              return item.main.temp;
            })
            .slice(0, 9),
        backgroundColor: "transparent",
        borderColor: "#ff0000",
        fill: true,
        pointBackgroundColor: "#ff0000",
        pointHoverBackgroundColor: "#ff0000",
        hoverBackgroundColor: "#ff0000",
        hoverBorderColor: "#ff0000",
        pointRadius: 3,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      scales: {
        x: {
          grid: {
            display: true,
          },
        },
        y: {
          ticks: {
            stepSize: 2,
            callback: function (value) {
              return value + "°C";
            },
          },
          grid: {
            borderDash: [10],
          },
        },
      },
    },
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/forecast/${currentCity}?units=${unit}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  }, [currentCity, unit]);

  if (weatherData)
    return (
      <div className={styles.dashboardContainer}>
        <div ref={props.dashboardRef} className={styles.tabsContainer}>
          <div className={styles.tabsRibbon}>
            <span>Today</span>
          </div>
          <InfoWidgets weatherData={weatherData} unit={unit} />
          <div className={styles.tabsRibbon}>
            <span>Temperature &#40;°{unit === "metric" ? "C" : "F"}&#41;</span>
          </div>
          <div className={styles.widgetRow} id="bar">
            {/* Add line chart with echarts to display first 8 entries of forecast data = 24 hours */}
            <Line data={dayData} options={options}></Line>
          </div>
          <Forecast unit={unit} weatherData={weatherData} />
        </div>
      </div>
    );
}
