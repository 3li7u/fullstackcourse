require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Person } = require("./models");
const { PORT, DBConnect } = require("./config");
const mongoose = require("mongoose");

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

app.get("/info", async (req, res) => {
  try {
    await DBConnect();
    const people = await Person.find();
    res.send(`
    Phonebook has info for ${people.length} people <br />
    ${new Date()}
  `);
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  } finally {
    mongoose.connection.close();
  }
});

app.get("/api/people", async (req, res, next) => {
  try {
    await DBConnect();
    const people = await Person.find();
    res.json({
      success: true,
      message:
        people.length === 0
          ? "There are no people to fetch"
          : `${people.length} people have been fetched successfully`,
      data: { people, total: people.length },
    });
  } catch (error) {
    next(error);
  } finally {
    mongoose.connection.close();
  }
});

app.get("/api/people/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await DBConnect();
    const person = await Person.findById(id);
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
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  } finally {
    mongoose.connection.close();
  }
});

app.delete("/api/people/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DBConnect();
    const person = await Person.findByIdAndDelete(id);
    if (person) {
      res.json({
        success: true,
        message: `${person.name} has been deleted successfully`,
        data: person,
      });
    } else
      res.status(404).json({
        success: false,
        message: `The requested person ${id} hasn't been found`,
      });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  } finally {
    mongoose.connection.close();
  }
});

app.post("/api/people", async (req, res) => {
  try {
    await DBConnect();
    const person = req.body;
    if (person?.number && person?.name) {
      const isNameUnique = !(await Person.findOne({
        name: person.name,
      }));
      if (isNameUnique) {
        const addedPerson = await Person.create(person);
        res.status(201).json({
          success: true,
          message: `New person: ${addedPerson.id} has been added successfully`,
          data: addedPerson,
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Name must be unique" });
      }
    } else {
      res.status(400).json({ success: false, message: "Missing data" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  } finally {
    mongoose.connection.close();
  }
});

app.put("/api/people/:id", async (req, res) => {
  try {
    await DBConnect();
    const { id } = req.params;
    const newPerson = req.body;
    if (newPerson.name && newPerson.number) {
      const person = await Person.findByIdAndUpdate(id, newPerson, {
        new: true,
      });
      if (person) {
        res.json({
          success: true,
          message: `${person.name} has been updated successfully`,
          data: person,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The requested person ${id} hasn't been found`,
        });
      }
    } else {
      res.status(400).json({ success: false, message: "Missing data" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  } finally {
    mongoose.connection.close();
  }
});

const unknownEndPoint = (req, res) =>
  res.status(404).json({
    success: false,
    message: `The requested end point: ${req.url} hasn't been found`,
  });

const errorHandler = (error, req, res, next) => {
  console.error("MyError: ", error.message);
  res.json({
    success: false,
    message: error.message,
  });
  next(error);
};

app.use(unknownEndPoint);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
