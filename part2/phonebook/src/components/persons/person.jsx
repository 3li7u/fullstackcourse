export default function Person({ id, name, number, handlePersonDeletion }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button onClick={() => handlePersonDeletion(id)}>Delete</button>
      </td>
    </tr>
  );
}
