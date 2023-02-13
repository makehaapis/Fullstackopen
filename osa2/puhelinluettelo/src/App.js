import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import InputFields from './components/InputFields'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const [Message, setMessage] = useState(null)

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
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
      setMessage(`Updated ${person.name}'s number`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      if (error.response) {
      setMessage(
        `Person '${person.name}' was already removed from server`
      )
      console.clear()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.filter(n => n.id !== id))
    }
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value)
  }

  const deletePerson = (id) => {
      const person = persons.find(person => person.id === id)
      if (window.confirm(`Are you sure you want to delete ${person.name}?`) === true) {
      personService
        .del(person.id)
        personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000) 
      })
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    else if (message.substring(0,6) === 'Person')
    {
      return(
      <div className="error">
      {message}
    </div>
    )
    }
    else {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={Message} />
      <Filter handleSearchStringChange={handleSearchStringChange} searchString={searchString}/>
      <form onSubmit={addPerson}>
        <InputFields newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
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