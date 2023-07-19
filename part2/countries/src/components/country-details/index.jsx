import { useEffect, useState } from "react";
import Spinner from "../spinner";
import weatherService from "../../services/weather.service";

export default function Country({ country }) {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const {
    name,
    capital,
    area,
    languages,
    flags,
    population,
    region,
    subregion,
    timezones,
  } = country;

  const renderLanguages = () => {
    const langs = [];
    for (let lang in languages) {
      langs.push(<li key={lang}>{languages[lang]}</li>);
    }
    return langs;
  };

  useEffect(() => {
    setIsLoading(true);
    weatherService
      .getWeather(capital)
      .then((weather) => setWeather(weather))
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  }, [capital]);

  return (
    <div>
      <h2>{name.official}</h2>
      <img src={flags.png} alt={flags.alt} width={200} border="1" />
      <div>
        <h4>Basic Information:</h4>
        <ul>
          <li>Capital: {capital}</li>
          <li>
            Area: {area} km<sup>2</sup>
          </li>
          <li>Population: {population}</li>
          <li>Region: {region}</li>
          <li>Subregion: {subregion}</li>
          <li>
            <span>Timezones:</span>
            <ul>
              {timezones.map((zone, index) => (
                <li key={index}>{zone}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <h4>Languages:</h4>
        <ul>{renderLanguages()}</ul>
      </div>
      <div>
        <h4>Weatherin {capital}:</h4>
        {isLoading ? (
          <Spinner />
        ) : (
          weather && (
            <>
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                alt="weather icon"
              />
              <p>
                {weather?.weather[0].main} ({weather?.weather[0].description})
              </p>
              <ul>
                <li>
                  Temperature: {weather?.main.temp}
                  <sup> °</sup>C
                </li>
                <li>Wind: {weather?.wind.speed} m/s</li>
                <li>Humidity: {weather?.main.humidity} %</li>
              </ul>
            </>
          )
        )}
      </div>
    </div>
  );
}
