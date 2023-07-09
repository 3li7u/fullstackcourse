import { useState } from "react";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    persons.find((person) => person.name === newName)
      ? alert(`${newName} is already exist!`)
      : (setPersons((prev) => [...prev, { name: newName }]), setNewName(""));
  };
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          placeholder="Type a name.."
        />
        <input type="submit" value="Add" />
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.length > 0 ? (
          persons.map(({ name }) => <li key={name}>{name}</li>)
        ) : (
          <li>There is no numbers yet! Add one</li>
        )}
      </ul>
    </>
  );
}
