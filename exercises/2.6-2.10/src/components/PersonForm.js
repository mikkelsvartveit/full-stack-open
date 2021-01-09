import React from 'react'

const PersonForm = ({ newName,
    handleNewNameChange,
    newNumber,
    handleNewNumberChange,
    addName }) => (
    <form>
        <div>
            name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
            <button type="submit" onClick={addName}>add</button>
        </div>
    </form>
)

export default PersonForm