import axios from 'axios'

const getWeather = (city) => {
  const api_key = process.env.REACT_APP_NOT_SECRET_CODE
  console.log(api_key)
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
  console.log(baseUrl)
  const request = axios.get(baseUrl)
  console.log(request)
  return request.then(response => response.data)
}

export default { getWeather }