import { filterChange } from '../reducers/filterReducer'
import { useDispatch} from 'react-redux'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        const searchstring = event.target.value
        if (searchstring) {
            dispatch(filterChange(searchstring))
        }
      }

    const style = {
      marginBottom: 10
    }
    
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter