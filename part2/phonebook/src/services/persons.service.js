import axios from "axios";

const personsAPI = axios.create({
  baseURL: "http://localhost:3000/api/persons",
});

const getAll = () => personsAPI.get("/").then((res) => res.data);

const create = (persone) =>
  personsAPI.post("/", persone).then((res) => res.data);

const remove = (personID) =>
  personsAPI.delete(`/${personID}`).then((res) => res.data);

const update = (personID, newPerson) =>
  personsAPI.put(`/${personID}`, newPerson).then((res) => res.data);

export default { getAll, create, remove, update };
