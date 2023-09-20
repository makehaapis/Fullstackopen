import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id
      const AnacdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...AnacdoteToChange,
        votes: AnacdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
    
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = ( content ) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = ( anecdote ) => {
  const votedAnecdote = {
    id: anecdote.id,
    content: anecdote.content,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    const updatedAnectode = await anecdoteService.update(votedAnecdote)
    dispatch(addVote(updatedAnectode))
  }
}


export default anecdoteSlice.reducer