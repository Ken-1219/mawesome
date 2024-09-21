import React from "react";
import styles from "../styles/Dashboard.module.css";

const Widget = ({ title, value }) => {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetDataTitle}>{title}</div>
      <div className={styles.widgetDataValue}>{value}</div>
    </div>
  );
};

export default function InfoWidgets({ weatherData, unit }) {
  const data = [
    {
      title: "Weather",
      value: weatherData ? weatherData.list[0].weather[0].main : "N/A",
    },
    {
      title: "Humidity",
      value: weatherData ? `${weatherData.list[0].main.humidity}%` : "N/A",
    },
    {
      title: "Wind Speed",
      value: weatherData ? `${weatherData.list[0].wind.speed} ${unit === "metric" ? "m/s" : "mph"}` : "N/A",
    },
    {
      title: "Visibility",
      value: weatherData ? `${weatherData.list[0].visibility} m` : "N/A",
    },
  ];

  return (
    <div className={styles.widgetRow}>
      {data.map((item, index) => (
        <Widget key={index} title={item.title} value={item.value} />
      ))}
    </div>
  );
}
