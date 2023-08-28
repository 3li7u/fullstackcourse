const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id == id);
  if (note)
    res.json({
      status: true,
      code: 200,
      message: `The requested note: ${id}, has been fetched successfully`,
      data: note,
    });
  else
    res.status(404).json({
      status: false,
      code: 404,
      message: `The requested note: ${id}, hasn't been found`,
      data: note,
    });
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id == id);
  if (note) {
    notes = notes.filter((note) => note.id != id);
    res.json({
      status: true,
      code: 204,
      message: `The requested note: ${id}, has been deleted successfully`,
      data: note,
    });
  } else {
    res.status(404).json({
      status: false,
      code: 404,
      message: `The requested note: ${id}, hasn't been found`,
      data: note,
    });
  }
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  if (note?.content) {
    const noteData = {
      content: note.content,
      important: note.important || false,
      id: crypto.randomUUID(),
    };
    notes.push(noteData);
    res.json({
      status: true,
      code: 200,
      message: "New note has been added successfully",
      data: noteData,
    });
  } else {
    res.status(400).json({
      status: false,
      code: 400,
      message: `Missing Content`,
      data: note,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
