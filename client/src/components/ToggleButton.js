import { useContext } from "react";
import { TemperatureUnitContext } from "../context/temperatureUnitContext";
import styles from "../styles/ToggleButton.module.css";

export default function ToggleButton() {
  const { unit, toggleUnit } = useContext(TemperatureUnitContext);

  const isCelsius = unit === "metric";

  return (
    <div className={styles.container}>
      <div className={styles.toggleWrapper}>
        <div className={`${isCelsius ? styles.celsius : styles.fahrenheit}`} />
        <div className={styles.labelWrapper}>
          <label
            className={`${styles.label} ${
              isCelsius ? styles.active : styles.inactive
            }`}
            onClick={() => {
              if (!isCelsius) toggleUnit();
            }}
          >
            °C
          </label>

          <label
            className={`${styles.label} ${
              !isCelsius ? styles.active : styles.inactive
            }`}
            onClick={() => {
              if (isCelsius) toggleUnit();
            }}
          >
            °F
          </label>
        </div>

        <div
          className={`${styles.slider} ${
            isCelsius ? styles.sliderLeft : styles.sliderRight
          }`}
        />
      </div>
    </div>
  );
}
