import AnecdoteForm from './components/AnecdoteForm'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'
import { notificationReducer } from './reducers'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const newVoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    newVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({type: 'SET', payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      notificationDispatch({type: 'NULL', payload: null})
    }, 5000) 
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes()
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <AnecdoteForm />
      </NotificationContext.Provider>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
