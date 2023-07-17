import { useState } from "react";
import personesService from "../../services/persons.service";

export default function AddPerson({ persons, setPersons }) {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const handlePersonChange = (event) =>
    setNewPerson((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );
    if (existingPerson) {
      if (
        confirm(
          `${existingPerson.name} is already exist! Do you want to update the number?`
        )
      )
        personesService
          .update(existingPerson.id, { ...newPerson, id: existingPerson.id })
          .then((updatedPerson) => {
            setPersons((prev) =>
              prev.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person
              )
            );
            setNewPerson({ name: "", number: "" });
          })
          .catch((err) => console.log(err.message));
    } else {
      personesService
        .create({
          ...newPerson,
          id: crypto.randomUUID(),
        })
        .then((person) => {
          setPersons((prev) => [...prev, person]);
          setNewPerson({ name: "", number: "" });
        })
        .catch((err) => console.log(err.message));
    }
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
