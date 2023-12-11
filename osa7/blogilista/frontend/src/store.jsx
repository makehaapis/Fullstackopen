import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'


const Store = configureStore({
    reducer: {
      notification: notificationReducer
    }
  })

export default Store