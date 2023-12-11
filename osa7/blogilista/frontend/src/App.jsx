import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const login = async (username, password) => {
    console.log(username, password)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
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

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    const notification = {
      message: `logged out`,
      error: false,
      time: 5,
    }
    dispatch(setNotification(notification))
  }

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog)
    const notification = {
      message: `A new blog '${newBlog.title}' by '${newBlog.author}' added`,
      error: false,
      time: 5,
    }
    dispatch(setNotification(notification))
    setBlogs(blogs.concat(createdBlog))
    blogFormRef.current.toggleVisibility()
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    const notification = {
      message: `A like for the blog '${blog.title}' by '${blog.author}'`,
      error: false,
      time: 5,
    }
    dispatch(setNotification(notification))
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      await blogService.remove(blog.id)
      const notification = {
        message: `The blog' ${blog.title}' by '${blog.author} removed`,
        error: false,
        time: 5
      }
      dispatch(setNotification(notification))
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
