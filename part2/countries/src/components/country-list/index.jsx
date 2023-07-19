export default function CountryList({ countries, getCountryDetails }) {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country}>
          <span>{country} </span>
          <button onClick={() => getCountryDetails(country)}>
            Show Details
          </button>
        </li>
      ))}
    </ul>
  );
}
