import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser(state, action) {
            state = action.payload
            return state
        },
        logOut(state, action) {
            state = action.payload
            return state
        }
    }
})

export const {addUser, logOut}  = userSlice.actions

export const setUser = (user) => {
    return dispatch => {
      dispatch(addUser(user))
      storageService.saveUser(user)
    }
  }

import storageService from '../services/storage'

export const loadUser = () => {
    const user = storageService.loadUser()
    return dispatch => {
        dispatch(addUser(user))
    }
}

export const logoutUser = () => {
    return dispatch => {
        storageService.removeUser()
        dispatch(logOut(null))
    }
}
  

export default userSlice.reducer