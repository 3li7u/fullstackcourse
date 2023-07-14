import { useState, useEffect } from "react";
import Note from "./components/note";
import noteService from "./services/notes";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [addingError, setAddingError] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    setIsLoading(true);
    noteService
      .getAll()
      .then((notes) => setNotes(notes))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newNoteData = {
      id: crypto.randomUUID(),
      content: newNote,
      important: Math.random() > 0.5,
    };
    setIsAdding(true);
    noteService
      .create(newNoteData)
      .then(
        (note) => (
          setNotes((prev) => [...prev, note]),
          setNewNote(""),
          setAddingError(null)
        )
      )
      .catch((err) => setAddingError(err))
      .finally(() => setIsAdding(false));
  };

  const handleNoteChange = (event) => setNewNote(event.target.value);

  const handleImportanceToggle = (noteID) => {
    const noteToBeToggled = notes.find(({ id }) => id === noteID);
    noteService
      .update({
        ...noteToBeToggled,
        important: !noteToBeToggled.important,
      })
      .then((updatedNote) =>
        setNotes((prev) =>
          prev.map((note) => (note.id === noteID ? updatedNote : note))
        )
      )
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll((prev) => !prev)}>
        Show {showAll ? "Important" : "All"}
      </button>
      <ul>
        {isLoading ? (
          <i>Loading..</i>
        ) : error ? (
          <i style={{ color: "red" }}>{error.message}</i>
        ) : notesToShow?.length > 0 ? (
          notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={handleImportanceToggle}
            />
          ))
        ) : (
          <i>There is no notes to show</i>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="note"
          value={newNote}
          onChange={handleNoteChange}
          placeholder="Type a note.."
        />
        <input type="submit" value="Save" disabled={isAdding} />
        {addingError && (
          <p style={{ color: "red" }}>
            <i> {addingError.message}</i>
          </p>
        )}
      </form>
    </div>
  );
}
