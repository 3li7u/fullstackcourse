import personesService from "../../services/persons.service";
import Person from "./person";

export default function Persons({ persons, setPersons }) {
  const handlePersonDeletion = (personID) => {
    personesService.remove(personID).then(() => {
      setPersons((prev) => prev.filter((person) => person.id !== personID));
    });
  };

  return persons.length > 0 ? (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
        {persons.map(({ id, name, number }) => (
          <Person key={id} {...{ id, name, number, handlePersonDeletion }} />
        ))}
      </tbody>
    </table>
  ) : (
    <h4>There is no numbers!</h4>
  );
}
