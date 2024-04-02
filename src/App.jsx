
import React, { useEffect, useState } from "react";
import Highlights from "./components/Highlights";
import Temperature from "./components/Temperature";
function App() {

  const [city, setCity] = useState("Lucknow");
  const [weatherData, setWeatherData] = useState(null);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=9f4cf7df43254bd4b2f122737243103&q=${city}&aqi=no`;

  useEffect(() => {

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data)
      })
      .catch((e) => {
        console.log(e);
      })

  }, [city])

  console.log("weatherData ", weatherData);

  return (

    <div>
      <div className=" bg-[black] h-screen flex justify-center align-top">
        <div className=" mt-40 w-1/5 h-2/5">

          {weatherData && <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData?.current.temp_c,
              conditon: weatherData?.current.conditon,
              isDay: weatherData?.current.isDay,
              location: weatherData?.location.name,
              time: weatherData?.location.localtime
            }}
            city={city}
          />}
        </div>
        <div className=" mt-40 w-1/3 h-2/5 p-10 grid grid-cols-2 gap-6">
          <h2 className=" text-slate-200 text-2xl col-span-2 "> Today's Highlights</h2>
          {
            weatherData &&
            (
              <>
                < Highlights
                  stats={{
                    title: "Wind Status",
                    value: weatherData.current.wind_mph,
                    unit: "mph",
                    direction: weatherData.current.wind_dir
                  }}
                />
                <Highlights
                  stats={{
                    title: "Humidity",
                    value: weatherData.current.humidity,
                    unit: "%",
                  }} />
                <Highlights
                  stats={{
                    title: "Visibility",
                    value: weatherData.current.vis_miles,
                    unit: "miles",
                  }} />
                <Highlights
                  stats={{
                    title: "Air Pressure",
                    value: weatherData.current.pressure_mb,
                    unit: "mb",
                  }} />
              </>
            )
          }


        </div>


      </div>

    </div>

  )
}
export default App