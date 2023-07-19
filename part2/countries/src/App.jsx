import { useEffect } from "react";
import { useState } from "react";
import Spinner from "./components/spinner";
import Country from "./components/country-details";
import countryService from "./services/country.service";
import CountryList from "./components/country-list";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    countryService
      .getAll()
      .then((countries) => {
        setCountries(countries.map(({ name }) => name.official));
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const getCountryDetails = (name) => {
    setIsLoading(true);
    countryService
      .getCountry(name)
      .then((country) => setCountryDetails(country))
      .catch((err) => console.log(err.message))
      .finally(() => {
        setIsLoading(false);
        setCountriesToShow([name]);
      });
  };

  useEffect(() => {
    if (country) {
      const timeout = setTimeout(() => {
        const filteredCountries = countries.filter((name) =>
          name.toLowerCase().includes(country.toLowerCase())
        );
        if (filteredCountries.length === 1)
          getCountryDetails(filteredCountries[0]);
        else {
          setCountriesToShow(filteredCountries);
          setIsLoading(false);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setCountriesToShow([]);
    }
  }, [country, countries]);

  const handleCountryChange = (e) => {
    if (e.target.value) {
      setIsLoading(true);
      setCountry(e.target.value);
    } else {
      setIsLoading(false);
      setCountry("");
    }
  };
  return (
    <>
      <input
        autoFocus
        type="text"
        value={country}
        onChange={handleCountryChange}
        placeholder="Enter country name"
      />
      {isLoading && <Spinner />}
      {countriesToShow.length < 1 ? (
        country ? (
          <p>
            <i>No Matches, Specify another filter</i>
          </p>
        ) : (
          <p>
            <i>Search for some country to show details</i>
          </p>
        )
      ) : countriesToShow.length === 1 ? (
        <Country country={countryDetails} />
      ) : countriesToShow.length > 10 ? (
        <p>
          <i>Too many matches, Specify another filter</i>
        </p>
      ) : (
        <CountryList countries={countriesToShow} {...{ getCountryDetails }} />
      )}
    </>
  );
}
