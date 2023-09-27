require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

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

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URI;

app.use(cors());
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

mongoose.set("strictQuery", false);
mongoose.connect(URI);
const noteSchema = new mongoose.Schema({ content: String, important: Boolean });
const Note = mongoose.model("Note", noteSchema);
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/notes", (req, res) => {
  Note.find().then((notes) => res.status(200).json(notes));
  mongoose.connection.close();
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id == id);
  if (note)
    res.json({
      success: true,
      code: 200,
      message: `The requested note: ${id}, has been fetched successfully`,
      data: note,
    });
  else
    res.status(404).json({
      success: false,
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
      success: true,
      code: 204,
      message: `The requested note: ${id}, has been deleted successfully`,
      data: note,
    });
  } else {
    res.status(404).json({
      success: false,
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
      success: true,
      code: 200,
      message: "New note has been added successfully",
      data: noteData,
    });
  } else {
    res.status(400).json({
      success: false,
      code: 400,
      message: `Missing Content`,
      data: note,
    });
  }
});

app.patch("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (data) {
    const note = notes.find((note) => note.id == id);
    if (note) {
      const newNote = { ...note, ...data };
      notes = notes.map((note) => (note.id == id ? newNote : note));
      res.json({
        success: true,
        code: 200,
        message: `The requested note: ${id} has been edited successfully`,
        data: newNote,
      });
    } else {
      res.status(404).json({
        success: false,
        code: 404,
        message: `The requested note: ${id} hasn't been found`,
        data: note,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      code: 400,
      message: `Missing Content`,
    });
  }
});

const unknownEndPoint = (req, res) =>
  res.status(404).json({
    success: false,
    message: `The requested end point: ${req.url} hasn't been found`,
  });
app.use(unknownEndPoint);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
