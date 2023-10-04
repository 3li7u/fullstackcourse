import axios from "axios";
const personsAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const getAll = () => personsAPI.get("/").then((res) => res.data);

const create = (person) => personsAPI.post("/", person).then((res) => res.data);

const remove = (personID) =>
  personsAPI.delete(`/${personID}`).then((res) => res.data);

const update = (personID, newPerson) =>
  personsAPI.put(`/${personID}`, newPerson).then((res) => res.data);

export default { getAll, create, remove, update };
