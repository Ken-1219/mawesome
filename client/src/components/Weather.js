import React from "react";
import styles from "../styles/Home.module.css";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const Weather = ({ weather, dashboardRef, handleScroll, setWeather, unit }) => {
  return (
    <div style={{ height: "100%" }}>
      <div className={styles.mainContainer}>
        <div className={styles.landingContainer}>
          <div className={styles.title}>
            <span>
              <img src="/icon.png" alt="mawesome logo" height="40px" />
            </span>
            <button
              className={styles.searchIcon}
              onClick={() => {
                //translate sidebar in from Right
                document.getElementById("sidebar").style.transform =
                  "translateX(0)";
              }}
            >
              <TravelExploreIcon fontSize="large" />
            </button>
          </div>
          <div className={styles.weatherWidgetContainer}>
            <div className={styles.weatherWidgetLeft}>
              <h2>
                {weather && weather.main.temp | 0}&#176;
                {unit === "metric" ? "C" : "F"}
              </h2>
            </div>
            <div className={styles.weatherWidgetRight}>
              <div>
                {weather && weather.weather[0].main}
                {weather && (
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    height="60px"
                    alt="weather icon"
                  />
                )}
              </div>
              <h3>
                {weather && weather.name}, {weather && weather.sys.country}
              </h3>
            </div>
            <div className={styles.goToDashboardContainer}>
              <div
                ref={dashboardRef}
                className={styles.goToDashboard}
                onClick={handleScroll}
              >
                Go To DashBoard <KeyboardArrowDownIcon fontSize="large" />
              </div>
            </div>
          </div>
        </div>
        <Dashboard />
        <Footer />
      </div>
      <div className={styles.sidebar} id="sidebar">
        <Sidebar className={styles.sidebar} setWeather={setWeather} />
      </div>
    </div>
  );
};

export default Weather;
