const express = require("express");
const crypto = require("crypto");
const morgan = require("morgan");
const cors = require("cors");

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const PORT = 3000;
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/info", (req, res) => {
  res.send(`
    Phonebook has info for ${data.length} people <br />
    ${new Date()}
  `);
});

app.get("/api/persons", (req, res) => {
  res.json({
    success: true,
    message: `${data.length} people have been fetched successfully`,
    data,
  });
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = data.find((person) => person.id == id);
  if (person)
    res.json({
      success: true,
      message: `Person: ${person.id} has been fetched successfully`,
      data: person,
    });
  else
    res.status(404).json({
      success: false,
      message: `The requested person: ${id} hasn't been found`,
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = data.find((person) => person.id == id);
  if (person) {
    data = data.filter((person) => person.id != id);
    res.json({
      success: true,
      message: `${person.name} has been deleted successfully`,
      data: person,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `The requested person ${id} hasn't been found`,
    });
  }
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (person?.number && person?.name) {
    const isNameUnique = !data.find((per) => per.name === person.name);
    if (isNameUnique) {
      const personeData = {
        name: person.name,
        number: person.number,
        id: crypto.randomUUID(),
      };
      data.push(personeData);
      res.status(201).json({
        success: true,
        message: `New person: ${personeData.name} has been added successfully`,
        data: personeData,
      });
    } else {
      res.status(400).json({ success: false, message: "Name must be unique" });
    }
  } else {
    res.status(400).json({ success: false, message: "Missing data" });
  }
});

app.put("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const newPerson = req.body;
  const person = data.find((person) => person.id == id);
  if (person) {
    if (newPerson.name && newPerson.number) {
      const newPersonData = { ...newPerson, id: person.id };
      data = data.map((person) => (person.id == id ? newPersonData : person));
      res.json({
        success: true,
        message: `${person.name} has been updated successfully`,
        data: newPersonData,
      });
    } else {
      res.status(400).json({ success: false, message: "Missing data" });
    }
  } else {
    res.status(404).json({
      success: false,
      message: `The requested person ${id} hasn't been found`,
    });
  }
});
const unknownEndPoint = (req, res) =>
  res.status(404).json({
    success: false,
    message: `The requested end point: ${req.url} hasn't been found`,
  });

app.use(unknownEndPoint);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
