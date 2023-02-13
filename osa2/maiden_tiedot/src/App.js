import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/Country'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')
  
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value)
  }

  const filteredCountries = countries.filter(countries => countries.name.common.toLowerCase().includes(searchString.toLowerCase()))

  if (filteredCountries.length === 1) {
  return (
      <div>
        <div>filter shown with<input value={searchString} onChange={handleSearchStringChange}></input></div>
          {filteredCountries.map(country=> (
              <div key={country.name.common}>
                  <CountryDetails country={country}/>
              </div>
          ))}
      </div>
  )
  }
  else if (filteredCountries.length < 10) {
    return (
      <div>
        <div>filter shown with<input value={searchString} onChange={handleSearchStringChange}></input></div>
      {filteredCountries.map(country=> (
          <table key={country.name.common}>
            <tbody>
              <tr>
              <td><Country country={country}/></td>
              <td><button onClick={() => setSearchString(country.name.common)}>show</button></td>
              </tr>
              </tbody>
          </table>
      ))}
  </div>
    )
  }
  else {
  return (
    <div>
      <div>filter shown with<input value={searchString} onChange={handleSearchStringChange}></input></div>
      <p>Too many matches, specify your filter</p>
    </div>
  )
  }
}

export default App;
