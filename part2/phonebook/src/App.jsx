import { useState } from "react";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

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
          type="number"
          name="number"
          value={newPerson.number}
          onChange={handlePersonChange}
          placeholder="Type a number.."
        />
        <input type="submit" value="Add" />
      </form>
      <h2>Numbers</h2>
      {persons.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Number</th>
            </tr>
            {persons.map(({ name, number }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4>There is no numbers yet! Add one</h4>
      )}
    </>
  );
}
