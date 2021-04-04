require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");
const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

morgan.token("data", (request, response) =>
  request.method === "POST" ? JSON.stringify(request.body) : ""
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

let phonebook = [
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

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/info", (request, response) => {
  Person.find({}).then((result) => {
    response.send(`
    <p>Phonebook has info for ${result.length} people</p>
    <p>${new Date()}</p>
  `);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person.findById(id).then((result) => {
    if (result) {
      response.json(result);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((entry) => entry.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  if (!request.body.name || !request.body.name) {
    return response.status(400).json({ error: "missing name or number!" });
  }

  Person.find({ name: request.body.name }).then((result) => {
    console.log(result);
    if (result.length !== 0) {
      return response
        .status(400)
        .json({ error: "person is already in phonebook!" });
    } else {
      const person = new Person({
        name: request.body.name,
        number: request.body.number,
      });

      person.save().then((result) => {
        response.json(result);
      });
    }
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Phonebook server running on port " + PORT);
});
