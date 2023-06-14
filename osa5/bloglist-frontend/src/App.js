import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } 
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Error: wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    if (blogObject.title !== '' && blogObject.author !== '' && blogObject.url !== '') {
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewTitle('')
        setNewUrl('')
        setNewAuthor('')
      })
    }
    else  if (blogObject.title === '' ) {
      setErrorMessage(`Error: Please add title to new blog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else  if (blogObject.author === '' ) {
      setErrorMessage(`Error: Please add author to new blog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else {
      setErrorMessage(`Error: Please add url to new blog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title: <input
        value={newTitle}
        onChange={handleTitleChange}
      />
      Author: <input
        value={newUrl}
        onChange={handleUrlChange}
      />
      Url: <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  const logOut = () => {
    console.log("painettu")
    window.localStorage.removeItem('loggedInUser')
    window.location.reload(false);
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }
  else {
  return (
    <div>
      <p>{user.name}</p>
      <button onClick={logOut}>Log out</button>
      <Notification message={errorMessage} />
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <div>
      {blogForm()}
      </div>
    </div>
  )
}
}

export default App