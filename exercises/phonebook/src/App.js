import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import phonebookService from "./services/phonebook";
import "./index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log();
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deleteName = (id) => {
    const name = persons.find((p) => p.id === id).name;
    if (window.confirm(`Delete ${name}?`))
      phonebookService.deleteEntry(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotification(`Deleted ${name}`);
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      // alert(`${newName} is already added to phonebook`);
      const confirmChange = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmChange) {
        const id = existingPerson.id;
        phonebookService
          .updateEntry(id, {
            name: existingPerson.name,
            number: newNumber,
          })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNotification(`Changed ${existingPerson.name}'s number`);
            setTimeout(() => setNotification(null), 3000);
          })
          .catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
            setTimeout(() => setError(null), 3000);
          });
      }
    } else {
      phonebookService
        .newEntry({ name: newName, number: newNumber })
        .then((returnedPersons) => {
          setPersons([...persons, returnedPersons]);
          setNotification(`Added ${newName}`);
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setError(error.response.data.error);
          setTimeout(() => setError(null), 3000);
        });

      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
        addName={addName}
      />

      <Notification message={notification} />

      <Error message={error} />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deleteName={deleteName} />
    </div>
  );
};

export default App;
