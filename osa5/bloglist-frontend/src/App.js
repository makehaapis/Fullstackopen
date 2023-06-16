import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  const blogFormRef = useRef()

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

  const removeBlogFromBlogs = (id) => {
    setBlogs((current) =>
      current.filter((blog) => blog.id !== id)
    )
  }

  const addLikeToBlog = (id) => {
    blogService.like(id)
  }

  const deleteBlog = (blogToBeDeleted, username) => {
    console.log(blogToBeDeleted)
    if (blogToBeDeleted.user.username === username) {
      if (window.confirm(`Remove blog ${blogToBeDeleted.title} by ${blogToBeDeleted.author}`)) {
        blogService.del(blogToBeDeleted.id)
        removeBlogFromBlogs(blogToBeDeleted.id)
      }
    }
    else {
      setErrorMessage('Error: you are not authorized to delete this blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    if (blogObject.title !== '' && blogObject.author !== '' && blogObject.url !== '') {
      blogService.create(blogObject)
        .then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))
          setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    else {
      setErrorMessage('Error: Please fill all fields to add a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedInUser')
    window.location.reload(false)
  }

  const sortedBlogs = [...blogs].sort((a, b) =>
    a.likes > b.likes ? -1 : 1,
  )

  return(
    <div>
      <h1>Blogs</h1>
      {!user &&
        <div>
          {loginForm()}
        </div>
      }
      {user &&
        <div>
          <p>{user.name}</p>
          <button onClick={logOut}>Log out</button>
          <Notification message={errorMessage} />
          <h2>Blogs</h2>
          <ul>
            {sortedBlogs.map(blog =>
              <Blog key={blog.id} blog={blog} username={user.username} likeBlog={addLikeToBlog} removeBlog={deleteBlog}/>
            )}
          </ul>
          <div>
            <br></br>
          </div>
          <Togglable buttonLabel='create new blog' ref={ blogFormRef }>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App