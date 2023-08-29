import { useState } from "react";
import personesService from "../../services/persons.service";
import Person from "./person";
import Notification from "../notification";

export default function Persons({ persons, setPersons }) {
  const [notification, setNotification] = useState(null);

  const handlePersonDeletion = (personID) => {
    const person = persons.find((person) => person.id === personID);
    if (confirm(`Are you sure you want to delete ${person.name}`))
      personesService
        .remove(personID)
        .then((data) => {
          setPersons((prev) => prev.filter((person) => person.id !== personID));
          setNotification({
            message: data.message,
            type: "success",
          });
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((err) => {
          setNotification({
            message: err.response?.data.message,
            type: "fail",
          });
          setTimeout(() => setNotification(null), 3000);
        });
  };

  return (
    <>
      {persons.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Number</th>
            </tr>
            {persons.map((person) => (
              <Person
                key={person.id}
                {...person}
                onDelete={handlePersonDeletion}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h4>There is no numbers!</h4>
      )}
      {notification && <Notification {...{ notification }} />}
    </>
  );
}
