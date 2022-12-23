import React from 'react'

const Persons = ({ filtered, persons, removePerson }) => {

let filter = persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()) || person.number.toLowerCase().includes(filtered.toLowerCase()))

  return (
    <div>
        <ul>
            {filter.length ? filter.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
                </li>
            )) : <h1>No match!</h1>
            }
        </ul>
    </div>
  )
}

export default Persons