import Header from "./components/header/Header"
import WeatherCard from "./components/weatherCard/WeatherCard"
import './index.css'
import { useGetCityMutation } from "./store/api/api"
import { ICity } from "./types/city.types"
import { useEffect, useState } from "react"
import useCities from "./hooks/useCities"
import Modal from "./components/modal/Modal"
import useActions from "./hooks/useActions"

const App: React.FC =  () => {



  const cities = useCities()

  const {removeCity} = useActions()

  const [getCity] = useGetCityMutation()


  useEffect(() => {
    getCity('moscow')
  }, [])


  return (
    <div className="app">
      <Header />
      <div className="main">
        {
          cities.length > 0 ?
          cities?.map((city: ICity, index) => (
            <WeatherCard cityIndex={index} city={city} key={index}/>
          ))
          :
          <div className="no-cities">add the city</div>
        }
      </div>
    </div>
  )
}

export default App
