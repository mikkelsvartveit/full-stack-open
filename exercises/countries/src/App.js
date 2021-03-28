import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Result = ({ countries, handleButtonClick }) => {
  if (countries.length === 1) {
    const { name, capital, population, languages, flag } = countries[0]
    return (
      <div>
        <h2>{name}</h2>

        <p>Capital: {capital}</p>
        <p>Population: {population}</p>

        <h3>Languages</h3>
        <ul>
          {languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>

        <img src={flag} alt="flag" height="100" />
      </div>

    )
  }
  else if (countries.length === 0) {
    return false
  }
  else if (countries.length > 10) {
    return <p>Too many matches, be more specific</p>
  }
  else {
    return (
      <ul>
        {countries.map(country => <li key={country.name}>
          {country.name}
          <button id={country.name} onClick={handleButtonClick}>show</button>
        </li>)}
      </ul>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleButtonClick = event => {
    setFilter(event.target.id)
  }

  const filteredCountries = countries.filter(country => (
    country.name.toLowerCase().includes(filter.toLowerCase())
  ))

  return (
    <div>
      <p>Find countries:
        <input type="text" value={filter} onChange={handleFilterChange} />
      </p>

      {filter ? (<Result countries={filteredCountries} handleButtonClick={handleButtonClick} />) : false}
    </div>
  )
}

export default App;
