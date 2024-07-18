import Header from "./components/header/Header"
import WeatherCard from "./components/weatherCard/WeatherCard"
import './index.css'
import { useGetCityMutation } from "./store/api/api"
import { ICity } from "./types/city.types"
import { useEffect } from "react"
import useCities from "./hooks/useCities"

const App: React.FC =  () => {



  const cities = useCities()


  const [getCity] = useGetCityMutation()


  useEffect(() => {
    getCity('moscow')
  }, [])


  return (
    <div className="app">
      <Header />
      <div className={cities.length > 0 ? "main" : 'no-cities'}>
        {
          cities.length > 0 ?
          cities?.map((city: ICity, index) => (
            <WeatherCard city={city} key={index}/>
          ))
          :
          <div>add the city</div>
        }
      </div>
    </div>
  )
}

export default App
