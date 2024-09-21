import { useState, useEffect, useContext, useRef } from "react";
import { CityContext } from "../context/cityContext";
import NoWeather from "../components/NoWeather";
import Weather from "../components/Weather";
import { TemperatureUnitContext } from "../context/temperatureUnitContext";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const { currentCity, updateCurrentCity } = useContext(CityContext);
  const { unit } = useContext(TemperatureUnitContext);
  const dashboardRef = useRef(null);

  const handleScroll = () => {
    dashboardRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (currentCity) {
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/weather/${currentCity}?units=${unit}`
        );
        const data = await res.json();
        setWeather(data);
        updateCurrentCity(data.name);
        localStorage.setItem("cachedWeather", JSON.stringify(data));
      };
      fetchData();
    }
  }, [currentCity, unit]);

  useEffect(() => {
    if (weather) {
      const main = weather.weather[0].main;
      switch (main) {
        case "Clouds":
          document.body.style.backgroundImage = "url('/bgs/cloudybg.jpg')";
          break;
        case "Clear":
          document.body.style.backgroundImage = "url('/bgs/clearbg.jpg')";
          break;
        case "Rain":
          document.body.style.backgroundImage = "url('/bgs/rainbg.jpg')";
          break;
        case "Snow":
          document.body.style.backgroundImage = "url('/bgs/snowbg.jpg')";
          break;
        case "Thunderstorm":
          document.body.style.backgroundImage = "url('/bgs/thunderbg.jpg')";
          break;
        case "Drizzle":
          document.body.style.backgroundImage = "url('/bgs/drizzlebg.jpg')";
          break;
        default:
          document.body.style.backgroundImage = "url('/bgs/otherbg.jpg')";
          break;
      }
    }
  }, [weather]);

  useEffect(() => {
    const cachedWeather = localStorage.getItem("cachedWeather");
    if (cachedWeather) {
      const weatherData = JSON.parse(cachedWeather);
      setWeather(weatherData);
    }
  }, []);

  if (weather)
    return (
      <Weather
        weather={weather}
        dashboardRef={dashboardRef}
        handleScroll={handleScroll}
        setWeather={setWeather}
        unit={unit}
      />
    );
  else return <NoWeather />;
}
