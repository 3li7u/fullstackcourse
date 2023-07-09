import { useState } from "react";

const DUMMY_PERSONS = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

export default function App() {
  const [persons, setPersons] = useState(DUMMY_PERSONS);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPersones = persons.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePersonChange = (event) =>
    setNewPerson((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();
    persons.find((person) => person.name === newPerson.name)
      ? alert(`${newPerson.name} is already exist!`)
      : (setPersons((prev) => [...prev, newPerson]),
        setNewPerson({ name: "", number: "" }));
  };

  const handleSearchTermChange = (event) => setSearchTerm(event.target.value);

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newPerson.name}
          onChange={handlePersonChange}
          placeholder="Type a name.."
        />
        <input
          type="text"
          name="number"
          value={newPerson.number}
          onChange={handlePersonChange}
          placeholder="Type a number.."
        />
        <input type="submit" value="Add" />
      </form>
      <h2>Numbers</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search for a name"
      />
      {filteredPersones.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Number</th>
            </tr>
            {filteredPersones.map(({ name, number }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4>There is no numbers!</h4>
      )}
    </>
  );
}
