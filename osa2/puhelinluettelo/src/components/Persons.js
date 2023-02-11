import Person from './Person'

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

export default Persons