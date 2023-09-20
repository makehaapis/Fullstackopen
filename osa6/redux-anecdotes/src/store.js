import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, {setAnecdotes} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'


const Store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notifications: notificationReducer
    }
  })

  anecdoteService.getAll().then(anecdotes =>
    Store.dispatch(setAnecdotes(anecdotes))
  )

export default Store