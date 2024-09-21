import { useState, useEffect, useContext, useCallback } from "react";
import { CityContext } from "../context/cityContext";
import styles from "../styles/Sidebar.module.css";
import PinnedCityWidget from "./PinWidget";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButton from "./ToggleButton";
import { TemperatureUnitContext } from "../context/temperatureUnitContext";

// Debounce function for delaying API requests
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export default function Sidebar(props) {
  const [searchCity, setSearchCity] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { currentCity, pinnedCities, updateCurrentCity, pinCity } =
    useContext(CityContext);
  const { unit } = useContext(TemperatureUnitContext);

  useEffect(() => {
    const cachedWeather = localStorage.getItem("cachedWeather");
    if (cachedWeather) {
      const weatherData = JSON.parse(cachedWeather);
      props.setWeather(weatherData);
      updateCurrentCity(weatherData.name);
    }
  }, []);

  const fetchSuggestions = useCallback(
    debounce((term) => {
      if (term) {
        fetch(`${process.env.REACT_APP_API_URL}/citylist/${term}`)
          .then((res) => res.json())
          .then((data) => {
            setSuggestions(data);
          })
          .catch((err) => {
            setSuggestions([]);
          });
      } else {
        setSuggestions([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (searchCity) {
      fetch(
        `${process.env.REACT_APP_API_URL}/weather/${searchCity}?units=${unit}`
      )
        .then((res) => res.json())
        .then((data) => {
          updateCurrentCity(data.name);
          props.setWeather(data);
          setNotFound(false);

          localStorage.setItem("cachedWeather", JSON.stringify(data));
        })
        .catch((err) => {
          setNotFound(true);
        });
    }
  }, [searchCity, unit]);

  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
      setNotFound(false);
    }
  }, [searchTerm, fetchSuggestions]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleCitySelect = (cityName) => {
    setSearchCity(cityName);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSearchContainer}>
        <form
          className={styles.sidebarSearchForm}
          onSubmit={(e) => {
            e.preventDefault();
            setSearchCity(searchTerm);
            setSearchTerm("");
          }}
        >
          <div
            className={styles.closeIcon}
            onClick={() =>
              (document.getElementById("sidebar").style.transform =
                "translateX(100%)")
            }
          >
            <CloseIcon fontSize="large" />
          </div>
          <input
            type="text"
            name="city"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a city"
            autoComplete="off"
          />
          <button type="submit">Go</button>
        </form>

        {searchTerm && (
          <div className={styles.suggestionsContainer}>
            {suggestions.length > 0 && (
              <ul className={styles.suggestionsList}>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.name}
                    className={styles.suggestionItem}
                    onClick={() => handleCitySelect(suggestion.name)}
                  >
                    {suggestion.name}, {suggestion.countryCode}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {notFound && <h1 className={styles.notFound}>City not found</h1>}

        <div className={styles.pinContainer}>
          <div className={styles.pinRibbon}>
            <div className={styles.pinRibbonText}>Pinned Cities</div>
            {currentCity &&
              !pinnedCities.some((city) => city.city === currentCity) && (
                <button onClick={() => pinCity(currentCity)}>
                  Pin {currentCity}
                </button>
              )}
          </div>
        </div>

        {pinnedCities.map((cityObject) => {
          return (
            <PinnedCityWidget city={cityObject.city} key={cityObject.key} />
          );
        })}
      </div>
      <ToggleButton />
    </div>
  );
}
