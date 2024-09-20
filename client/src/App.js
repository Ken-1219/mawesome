import CityContextProvider from './context/cityContext'
import Home from './pages/Home'

export default function App({ pageProps }) {
  return (
    <CityContextProvider>
      <Home {...pageProps} />
    </CityContextProvider>
  )
}
