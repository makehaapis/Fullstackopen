import { useState } from 'react'

const Filter = ({handleSearchStringChange},{searchString}) => {
  return(
  <div>filter shown with<input value={searchString} onChange={handleSearchStringChange}></input></div>
  )
}

const Person = ({person}) => {
  return (
    <table>
    <tbody>
          <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        </tbody>
    </table>
  )
}

const Persons = (props) => {
  const persons = props.persons
  const searchString = props.searchString.toLowerCase()
  return(
  <div>
    {persons.filter(persons => persons.name.toLowerCase().includes(searchString)).map(person=> (
    <Person key={person.name} person={person}/>
    ))}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    let nameFound =  false;
    persons.forEach(person => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName} is already added to phonebook`)
        nameFound = true
      }
    })
    if (nameFound === false) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
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
      <Persons persons={persons} searchString={searchString}/>
    </div>
  )
}

export default App