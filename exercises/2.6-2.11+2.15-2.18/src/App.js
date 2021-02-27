import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
    if (window.confirm(`Delete ${persons.find((p) => p.id === id).name}?`))
      phonebookService.deleteEntry(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
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
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            )
          );
      }
    } else {
      phonebookService
        .newEntry({ name: newName, number: newNumber })
        .then((returnedPersons) => setPersons([...persons, returnedPersons]));
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

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deleteName={deleteName} />
    </div>
  );
};

export default App;
