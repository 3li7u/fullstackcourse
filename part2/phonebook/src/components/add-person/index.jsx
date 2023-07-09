import { useState } from "react";

export default function AddPerson({ persons, setPersons }) {
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
  );
}
