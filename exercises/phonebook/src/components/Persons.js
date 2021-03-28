import React from "react";

const Persons = ({ persons, deleteName }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deleteName(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
