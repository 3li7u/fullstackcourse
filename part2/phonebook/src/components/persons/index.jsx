import Person from "./person";

export default function Persons({ persons }) {
  return persons.length > 0 ? (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
        {persons.map(({ name, number }) => (
          <Person key={name} name={name} number={number} />
        ))}
      </tbody>
    </table>
  ) : (
    <h4>There is no numbers!</h4>
  );
}
