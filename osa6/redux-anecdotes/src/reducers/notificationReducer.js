import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        addNotification(state, action) {
            state = action.payload
            return state
        },
    }
})

export const setNotification = (message, time) => {
    return dispatch => {
      dispatch(addNotification(message))
      setTimeout(() => {
        dispatch(addNotification(null))
      }, time*1000) 
    }
  }

export const {addNotification}  = notificationSlice.actions
export default notificationSlice.reducer