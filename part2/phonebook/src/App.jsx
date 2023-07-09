import { useState } from "react";
import AddPerson from "./components/add-person";
import Filter from "./components/filter";
import Persons from "./components/persons";

const DUMMY_PERSONS = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

export default function App() {
  const [persons, setPersons] = useState(DUMMY_PERSONS);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPersones = persons.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
