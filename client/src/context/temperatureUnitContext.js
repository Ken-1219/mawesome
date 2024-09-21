import { createContext, useState, useEffect, useRef } from "react";

export const TemperatureUnitContext = createContext();

const TemperatureUnitProvider = (props) => {
  const [unit, setUnit] = useState("metric");
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      const savedUnit = localStorage.getItem("weatherAppUnit");
      if (savedUnit) {
        setUnit(savedUnit);
      }
      mounted.current = true;
    } else {
      localStorage.setItem("weatherAppUnit", unit);
    }
  }, [unit]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
      {props.children}
    </TemperatureUnitContext.Provider>
  );
};

export default TemperatureUnitProvider;
