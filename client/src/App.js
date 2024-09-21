import CityContextProvider from "./context/cityContext";
import TemperatureUnitProvider from "./context/temperatureUnitContext";
import Home from "./pages/Home";

export default function App({ pageProps }) {
  return (
    <CityContextProvider>
      <TemperatureUnitProvider>
        <Home {...pageProps} />
      </TemperatureUnitProvider>
    </CityContextProvider>
  );
}
