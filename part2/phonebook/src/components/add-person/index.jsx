import { useState } from "react";
import personesService from "../../services/persons.service";
import Notification from "../notification";

export default function AddPerson({ persons, setPersons }) {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [notification, setNotification] = useState(null);

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
            setNotification({
              message: `${existingPerson.name} has been updated successfully`,
              type: "success",
            });
            setTimeout(() => setNotification(null), 3000);
          })
          .catch((err) => {
            setNotification({
              message: err.message,
              type: "fail",
            });
            setTimeout(() => setNotification(null), 3000);
          });
    } else {
      personesService
        .create({
          ...newPerson,
          id: crypto.randomUUID(),
        })
        .then((person) => {
          setPersons((prev) => [...prev, person]);
          setNewPerson({ name: "", number: "" });
          setNewPerson({ name: "", number: "" });
          setNotification({
            message: `${person.name} has been Added successfully`,
            type: "success",
          });
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((err) => {
          setNotification({
            message: err.message,
            type: "fail",
          });
          setTimeout(() => setNotification(null), 3000);
        });
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
      {notification && <Notification {...{ notification }} />}
    </form>
  );
}
