import './index.css';
import React, { useState , useEffect} from 'react';

/*images*/


import clearimage from "./images/clear.png"
import cloudimage from "./images/cloud.png"
import drizzleimage from "./images/dizzle.png"
import humidityimage from "./images/humidity.png"
import rainimage from "./images/rain.png"
import snowimage from "./images/snow.png"
import windimage from "./images/wind.png"
import  searchimage from "./images/search.png"






function WeatherDetail({icon, temp, city, country, lat, log, humidity, wind}) {
  return (
    <>
    <div className="image">
      <img src={icon} alt="Weather" />
    </div>

  <div className="temp" >{temp}°C</div>

  <div className="location">{city}</div>

  <div className="country">{country}</div>

  <div className="cord">

<div>
<span className="lat">latitude</span>
<span>{lat}</span>
</div>

<div>
<span className="log">longitude</span>
<span>{log}</span>
</div>
</div>

<div className="data-container">

  <div className="element">
    
  <img src={humidityimage} alt="humidity" className="icon" height={50} width={50} />

  <div className="data"> 
  
  <div className="humidity-percent"> {humidity} % </div>

<div className="text">Humidity</div>

  </div>
  </div>

  <div className="element">
    
    <img src={windimage} alt="wind" className="icon" height={50} width={50} />
  
    <div className="data"> 
    
    <div className="wind-percent"> {wind} Km/h</div>
  
  <div className="text">Wind Speed</div>
  
    </div>
    </div>

</div>

  </>
  );
}

function App() 

{

  let api_key = "8aaf32095be547502a853d6ce81ec7f8"

const [icon, setIcon] = useState(snowimage)
const [temp , setTemp] = useState(0)
const[city, setCity] = useState("")
const [country, setCountry] = useState("PS")
const [lat, setLat] = useState(0)
const [log, setLog] = useState(0)
const [humidity, setHumidity] = useState(0)
const [wind, setWind] = useState(0)

const[text, settext] = useState("Palestine")
const[cityNotFound, setCityNotFound] = useState(false)
const[loading, setLoading] = useState(false)

const[error, setError] = useState(null);



const weatherIconMap = {

  "01d": clearimage,
  
  "01n": clearimage,
  
  "02d": cloudimage,
  
  "02n": cloudimage,
  
  "03d": drizzleimage,
  
  "03n": drizzleimage,
  
  "04d": drizzleimage,
  
  "04n": drizzleimage,
  
  "09d": rainimage,
  
  "09n": rainimage,
  
  "10d": rainimage,
  
  "10n": rainimage,
  
  "13d": snowimage,
  
  "13n": snowimage,
  
  
  
  };

const search = async () => {
  setLoading(true);
  setCityNotFound(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();  

    

    if (response.ok) {
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
    
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode ]|| clearimage)
      setCityNotFound(false);
      setError(null); 
    } else {
      setCityNotFound(true);
      console.error("City Not Found", data.message);
    }
    

  } catch (error) {
    console.error("An Error Occurred:", error.message);
    setError("An Error Occurred While Fetching weather Data.");
    
  } finally {
    setLoading(false);
  }
};


const handleCity =  (e) => { settext(e.target.value) }

const handleKeyDown = (e) => {
  if (e.key === "Enter") { 
    search();
  }
};

useEffect(function() {
  search();
}, [])


  return (
    <>
    <div className="container">
      <div className="input-container">
        <input 
        type="text" className="cityInput" placeholder="Search City" 
        onChange={handleCity} value={text}
        
        onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={() => search()} >
          <img src={searchimage} alt="Search" height="20px" width="20px"/>
        </div>
      </div>

      


      {loading && <div className="loading-message">loading...</div>}
      {error &&   <div className="error-message">{error}</div>}
     { cityNotFound && <div className="city-not-found">City Not Found</div>}

      
  {  !loading && !cityNotFound &&   <WeatherDetail icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
  }


  <p className="copyright">
    Designed by <span>Mohamed Aslam</span>
  </p>
  
  </div>
    </>
  );
}

export default App;
