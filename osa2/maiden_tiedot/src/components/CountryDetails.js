import { useState, useEffect } from 'react'
import weatherService from '../services/weatherData'
import Weather from './Weather'

const CountryDetails = ({country}) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    weatherService
      .getWeather(country.capital)
      .then(initialWeather => {
        setWeather(initialWeather)
      })
  }, [])

    const flagUrl =country.flags[Object.keys(country.flags)[0]]

    if (weather) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
            {Object.entries(country.languages).map(([key, language]) => (
                <li key={key}>{language}</li>
            ))}
        </ul>
        <img src={flagUrl} alt="Flag" width="320"></img>
        <Weather weather={weather}/>
      </div>
    )
  }
  }


export default CountryDetails