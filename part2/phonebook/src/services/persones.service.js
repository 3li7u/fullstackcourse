import axios from "axios";

const personesAPI = axios.create({ baseURL: "http://localhost:3000/persones" });

const getAll = () => personesAPI.get("/").then((res) => res.data);

const create = (persone) =>
  personesAPI.post("/", persone).then((res) => res.data);

export default { getAll, create };
