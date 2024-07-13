import Header from "./components/header/Header"
import WeatherCard from "./components/weatherCard/WeatherCard"
import './index.css'
import { useGetCityMutation } from "./store/api/api"
import { ICity } from "./types/city.types"
import { useEffect } from "react"
import useCities from "./hooks/useCities"

const App: React.FC =  () => {


  // const {addCity} = useActions()

  const cities = useCities()

  const [getCity] = useGetCityMutation()

  useEffect(() => {
    getCity('moscow')
  }, [])


  return (
    <div className="app">
      <Header />
      <div className="main">
        {
          cities ?
          cities?.map((city: ICity, index) => (
            <WeatherCard city={city} key={index}/>
          ))
          :
          <div className="no-cities">Добавьте город</div>
        }
      </div>
    </div>
  )
}

export default App
