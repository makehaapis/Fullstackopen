import { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import storageService from '../services/storage'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(username, password)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      storageService.saveUser(user)
      const notification = {
        message: `welcome!`,
        error: false,
        time: 5,
      }
      dispatch(setNotification(notification))
    } catch (e) {
      const notification = {
        message: `wrong username or password`,
        error: true,
        time: 5,
      }
      dispatch(setNotification(notification))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
