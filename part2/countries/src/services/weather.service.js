import axios from "axios";

const weatherEndPoint = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_END_POINT,
});
const weatherAPIKey = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (capital) =>
  weatherEndPoint
    .get(`/?q=${capital}&appid=${weatherAPIKey}&units=metric`)
    .then((res) => res.data);

export default { getWeather };
