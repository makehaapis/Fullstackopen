import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject)
    let nameFound =  false;
    persons.forEach(person => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true) {
          updatePerson(person.id)
        }
        nameFound = true
      }
    })
    if (nameFound === false) {
        personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      }) 
    }
  }

  const updatePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = {...person, number: newNumber}
    personService
    .update(person.id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    })
    .catch(error => {
      alert(
        `the person '${person.name}' was already deleted from server`
      )
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value)
    console.log(searchString)
  }

  const deletePerson = (id) => {
    if (window.confirm("Press a button!") === true) {
      const person = persons.find(person => person.id === id)
      personService
        .del(person.id)
        personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          console.log(persons)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleSearchStringChange={handleSearchStringChange} searchString={searchString}/>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.filter(persons => persons.name.toLowerCase().includes(searchString.toLowerCase())).map(person=> (
            <table key={person.id}>
            <tbody>
              <Person person={person} deletePerson={() => deletePerson(person.id)}/>
          </tbody>
      </table>
      ))}
      </div>
    </div>
  )
}

export default App