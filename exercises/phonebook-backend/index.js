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

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  const note = {
    name: request.body.name,
    number: request.body.number,
  };

  Person.findByIdAndUpdate(id, note, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  if (error.name == "CastError") {
    return response.status(400).send({ error: "invalid id format" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Phonebook server running on port " + PORT);
});
