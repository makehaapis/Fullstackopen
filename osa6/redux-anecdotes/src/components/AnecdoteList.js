import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

    const searchstring = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)

    const sortedAnecdotes = [...anecdotes].sort((a, b) =>
        a.votes > b.votes ? -1 : 1,
    )

    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(addNotification(`new anecdote '${anecdote.content}'`))
      dispatch(addNotification(`You voted for '${anecdote.content}'`))
      //dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
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
          <button onClick={() => vote(anecdote )}>vote</button>
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
              <button onClick={() =>  vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </div>
      )
}
}

export default AnecdoteList