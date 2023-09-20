import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        if (content) {
          event.target.anecdote.value = ''
          dispatch(createAnecdote(content))
          dispatch(addNotification(`Added anecdote '${content}'`))
      }
    }

return (
<div><h2>create new</h2>
<form onSubmit={addAnecdote}>
  <input name="anecdote"/> 
  <button type="submit">add</button>
</form>
</div>)
}

export default AnecdoteForm