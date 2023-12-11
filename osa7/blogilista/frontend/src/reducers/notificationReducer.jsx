import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {message: null},
    reducers: {
        addNotification(state, action) {
            state = action.payload
            return state
        },
    }
})

export const setNotification = (notification) => {
    return dispatch => {
      dispatch(addNotification(notification))
      setTimeout(() => {
        dispatch(addNotification({message: null}))
      }, notification.time*1000)
    }
  }

export const {addNotification}  = notificationSlice.actions
export default notificationSlice.reducer