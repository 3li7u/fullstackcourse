import { useState, useEffect } from "react";
import AddPerson from "./components/add-person";
import Filter from "./components/filter";
import Persons from "./components/persons";
import axios from "axios";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPersones = persons.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/persones")
      .then((res) => setPersons(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <AddPerson persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Persons persons={filteredPersones} />
    </>
  );
}
