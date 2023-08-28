import axios from "axios";

const baseURL = "http://localhost:3000/api/notes";

const getAll = () => axios.get(baseURL).then((res) => res.data);

const create = (note) => axios.post(baseURL, note).then((res) => res.data);

const update = (note) =>
  axios.patch(`${baseURL}/${note.id}`, note).then((res) => res.data);

export default { getAll, create, update };
