import { useState, useEffect } from "react";
import Note from "./components/note";

import axios from "axios";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    axios
      .get("http://localhost:3000/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newNoteData = {
      id: crypto.randomUUID(),
      content: newNote,
      important: Math.random() > 0.5,
    };
    setNotes((prev) => [...prev, newNoteData]);
    setNewNote("");
  };

  const handleNoteChange = (event) => setNewNote(event.target.value);

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll((prev) => !prev)}>
        Show {showAll ? "Important" : "All"}
      </button>
      <ul>
        {notesToShow?.length > 0 ? (
          notesToShow.map((note) => <Note key={note.id} note={note} />)
        ) : (
          <i>Loading..</i>
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
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
