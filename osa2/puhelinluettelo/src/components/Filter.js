const Filter = ({handleSearchStringChange},{searchString}) => {
  return(
  <div>filter shown with<input value={searchString} onChange={handleSearchStringChange}></input></div>
  )
}

export default Filter