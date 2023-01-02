
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from "./services/persons"
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState ('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personAlready = persons.find(person => person.name === newName)

    if(personAlready){
    if (window.confirm (`${personAlready.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
      .update(personAlready.id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')

          setMessage(
            `Updated ${returnedPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
    })
    .catch(error => {
      setMessage(
        `ERROR! Information of ${personAlready.name} has already been removed from server`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== personAlready.id))
        setNewName('')
        setNewNumber('')
    })
    }}
    
    else if (persons.find(person => person.number === newNumber)) {
      window.alert (`${newNumber} is already added to phonebook`)
    }else{
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        let errorMessage = error.response.data.error
        setMessage(`ERROR! ${errorMessage}`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')

        console.log(error.response.data);
      })
    }
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))

        setMessage(
          `Removed ${person.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    })
  }
  }
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFiltered(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filtered={filtered} handleFilter={handleFilter} />

      <h3>Add new</h3>

      <PersonForm 
        addNumber={addNumber} 
        newName={newName} 
        newNumber={newNumber} 
        handlePersonChange={handlePersonChange} 
        handleNumberChange={handleNumberChange}

        />
      
      <h3>Numbers</h3>
      
      <Persons filtered={filtered} persons={persons} removePerson={removePerson} />

    </div>
  )

}

export default App
