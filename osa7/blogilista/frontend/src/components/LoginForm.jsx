/*import { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import {storageService} from '../services/storage'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const onLogin = async (username, password) => {
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

  const handleSubmit = (event) => {
    console.log(username, password)
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm*/
