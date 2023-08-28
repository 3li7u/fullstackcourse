const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/info", (req, res) => {
  res.send(`
    Phonebook has info for ${data.length} people <br />
    ${new Date()}
  `);
});

app.get("/api/persones", (req, res) => {
  res.json(data);
});

app.get("/api/persones/:id", (req, res) => {
  const { id } = req.params;
  const person = data.find((person) => person.id == id);
  if (person) res.json(person);
  else
    res
      .status(404)
      .json({ error: `The requested persone: (${id}) hasn't been found` });
});

app.delete("/api/persones/:id", (req, res) => {
  const { id } = req.params;
  const person = data.find((person) => person.id == id);
  if (person) {
    data = data.filter((person) => person.id != id);
    res.json({
      message: `The person: (${id}) has been deleted successfully`,
      person,
    });
  } else {
    res
      .status(404)
      .json({ error: `The requested persone (${id}) hasn't been found` });
  }
});

app.post("/api/persones", (req, res) => {
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
      res.json({
        message: `New Person has been added successfully`,
        data: personeData,
      });
    } else {
      res.status(400).json({ error: "Name must be unique" });
    }
  } else {
    res.status(400).json({ error: "Missing Data" });
  }
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
