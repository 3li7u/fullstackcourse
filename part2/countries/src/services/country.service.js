import axios from "axios";

const countryEndPoint = axios.create({
  baseURL: import.meta.env.VITE_API_END_POINT,
});

const getAll = () => countryEndPoint.get("/all").then((res) => res.data);

const getCountry = (name) =>
  countryEndPoint.get(`/name/${name}`).then((res) => res.data);

export default { getAll, getCountry };
