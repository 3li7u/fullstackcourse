import axios from "axios";

const countryEndPoint = axios.create({
  baseURL: "https://studies.cs.helsinki.fi/restcountries/api/",
});

const getAll = () => countryEndPoint.get("/all").then((res) => res.data);

const getCountry = (name) =>
  countryEndPoint.get(`/name/${name}`).then((res) => res.data);

export default { getAll, getCountry };
