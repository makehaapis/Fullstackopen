import { useDispatch, useSelector } from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = [...anecdotes].sort((a, b) =>
        a.votes > b.votes ? -1 : 1,
    )

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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList