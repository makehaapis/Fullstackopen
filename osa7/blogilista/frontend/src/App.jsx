import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, deleteBlog } from './reducers/blogReducer'
import { loadUser, logoutUser } from './reducers/userReducer'

const App = () => {

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUser())
  }, [dispatch]) 

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const logout = () => {
    dispatch(logoutUser())
    const notification = {
      message: `logged out`,
      error: false,
      time: 5,
    }
    dispatch(setNotification(notification))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      dispatch(deleteBlog(blog))
      const notification = {
        message: `The blog' ${blog.title}' by '${blog.author} removed`,
        error: false,
        time: 5
      }
      dispatch(setNotification(notification))
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => a.likes > b.likes ? -1 : 1,)


  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  if(sortedBlogs)
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.username} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  )}

export default App