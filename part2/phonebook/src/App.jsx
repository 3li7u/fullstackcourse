import { useState, useEffect } from "react";
import AddPerson from "./components/add-person";
import Filter from "./components/filter";
import Persons from "./components/persons";
import personsService from "./services/persons.service";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPersons = persons.filter((person) =>
    person?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    personsService
      .getAll()
      .then((peopleData) => setPersons(peopleData.data.people))
      .catch((err) => console.log(err?.response?.data.message));
  }, []);

  return (
    <>
      <h2>Phone book</h2>
      <AddPerson persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </>
  );
}
