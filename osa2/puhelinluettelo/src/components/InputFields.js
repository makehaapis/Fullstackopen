
const InputFields = ({newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <div>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        </div>
    )
}

export default InputFields