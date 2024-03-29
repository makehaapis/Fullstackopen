import Togglable from './Togglable'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, likeBlog, removeBlog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
  }

  const addLikeToBlog = (blog) => {
    likeBlog(blog.id)
    setLikes(likes + 1)
  }

  const deleteBlog = (blog, username) => {
    removeBlog(blog, username)
  }

  const DeleteButton = ({ blog, username }) => {
    if (blog.user.username === username) {
      return (
        <div><button onClick={() => deleteBlog(blog, username)}>delete</button></div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  if (!blog.user.username) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <Togglable buttonLabel="show">
          {blog.author} <br></br>{blog.url}<br></br> {likes} <br></br>{username}<br></br>
        </Togglable>
      </div>
    )
  }
  else {
    return (
      <div style={blogStyle}>
        <p>{blog.title}</p><Togglable buttonLabel="show"><p>{blog.author}</p><p>{blog.url}</p><p>{likes}</p> <button onClick={() => addLikeToBlog(blog)}>Like</button><p>{blog.user.username}</p><DeleteButton blog={blog} username={username}/></Togglable>
      </div>
    )
  }
}

export default Blog