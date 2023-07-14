export default function Note({ note, toggleImportance }) {
  return (
    <li>
      <span>{note.content}</span>
      <small
        style={{
          marginInline: "5px",
          border: "1px solid #bbb",
          borderRadius: "4px",
          paddingInline: "5px",
        }}>
        {note.important ? (
          <i style={{ color: "green" }}>important</i>
        ) : (
          <i>not-important</i>
        )}
      </small>
      <button onClick={() => toggleImportance(note.id)}>toggle</button>
    </li>
  );
}
