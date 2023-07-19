export default function Country({ country }) {
  const { name, capital, area, languages, flags } = country;
  const renderLanguages = () => {
    for (let lang in languages) {
      return <li key={lang}>{languages[lang]}</li>;
    }
  };
  return (
    <div>
      <h2>{name.official}</h2>
      <img src={flags.png} alt={flags.alt} width={200} />
      <div>
        <p>Capital: {capital}</p>
        <p>
          Area: {area} km<sup>2</sup>
        </p>
        <h4>Languages:</h4>
        <ul>{renderLanguages()}</ul>
      </div>
    </div>
  );
}
