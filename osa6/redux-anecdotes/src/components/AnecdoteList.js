import { useDispatch, useSelector } from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

    const searchstring = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)

    const sortedAnecdotes = [...anecdotes].sort((a, b) =>
        a.votes > b.votes ? -1 : 1,
    )

    const vote = (id) => {
      dispatch(addVote(id))
      
    }

    const voteNotification = (content) => {
      dispatch(addNotification(`You voted for '${content}'`))
    }

  if (searchstring === 'ALL') {
  return(
    <div>
    <h2>Anecdotes</h2>
    {sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {voteNotification(anecdote.content); vote(anecdote.id)}}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
} else {
    return(
        <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.filter(anecdotes => anecdotes.content.toLowerCase().includes(searchstring.toLowerCase())).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {voteNotification(anecdote.content); vote(anecdote.id)}}>vote</button>
            </div>
          </div>
        )}
        </div>
      )
}
}

export default AnecdoteList