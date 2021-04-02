const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
morgan.token("data", (request, response) =>
  request.method === "POST" ? JSON.stringify(request.body) : ""
);

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
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
  response.json(phonebook);
});

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((entry) => entry.id === id);

  if (person) {
    response.json(phonebook.find((entry) => entry.id === id));
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((entry) => entry.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 1000000);

  if (!request.body.name || !request.body.name) {
    return response.status(400).json({ error: "missing name or number!" });
  } else if (phonebook.find((entry) => entry.name === request.body.name)) {
    return response
      .status(400)
      .json({ error: "person is already in phonebook!" });
  }

  const newEntry = {
    id: id,
    name: request.body.name,
    number: request.body.number,
  };

  phonebook = [...phonebook, newEntry];
  response.json(newEntry);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Phonebook server running on port " + PORT);
});
