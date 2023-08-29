import { useState, useEffect } from "react";
import AddPerson from "./components/add-person";
import Filter from "./components/filter";
import Persons from "./components/persons";
import personesService from "./services/persons.service";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPersones = persons.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    personesService
      .getAll()
      .then((personesData) => setPersons(personesData.data))
      .catch((err) => console.log(err.response?.data.message));
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <AddPerson persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Persons persons={filteredPersones} setPersons={setPersons} />
    </>
  );
}
