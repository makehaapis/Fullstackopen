import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'


const Store = configureStore({
    reducer: {
      notification: notificationReducer,
      blogs: blogReducer
    }
  })

export default Store