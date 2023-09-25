import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import Notification from './Notification'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
     dispatch({type: 'SET', payload: `anecdote '${content}' added`})
      setTimeout(() => {
        dispatch({type: 'NULL', payload: null})
      }, 5000) 
  } else {
    dispatch({type: 'SET', payload: `too short anecdote, must have length 5 or more`})
    setTimeout(() => {
      dispatch({type: 'NULL', payload: null})
    }, 5000) 
  }
}

  return (
    <div>
      <Notification message={notification}/>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
