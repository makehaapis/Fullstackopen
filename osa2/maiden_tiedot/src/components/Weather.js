const Weather = (props) => {
const icon = props.weather.weather.map(weather => weather.icon)
const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
return (
    <div>
        <p>temperature {props.weather.main.temp - 273} Celcius</p>
        <img src={iconUrl}></img>
        <p>wind {props.weather.wind.speed} m/s</p>
    </div>
    )
}

export default Weather