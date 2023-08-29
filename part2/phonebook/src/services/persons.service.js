import axios from "axios";

const personsAPI = axios.create({
  baseURL: "https://phonebook-0i6z.onrender.com/api/persons",
});

const getAll = () => personsAPI.get("/").then((res) => res.data);

const create = (persone) =>
  personsAPI.post("/", persone).then((res) => res.data);

const remove = (personID) =>
  personsAPI.delete(`/${personID}`).then((res) => res.data);

const update = (personID, newPerson) =>
  personsAPI.put(`/${personID}`, newPerson).then((res) => res.data);

export default { getAll, create, remove, update };
