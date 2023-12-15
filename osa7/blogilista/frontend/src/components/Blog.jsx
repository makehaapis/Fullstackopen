import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, canRemove, remove }) => {
  const [visible, setVisible] = useState(false)
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }

  const dispatch = useDispatch()

  const like = (blog) => {
    dispatch(likeBlog(blog))
    const notification = {
      message: `A like for the blog '${blog.title}' by '${blog.author}'`,
      error: false,
      time: 5,
    }
    dispatch(setNotification(notification))
  }

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      {visible && (
        <div>
          <div>
            {' '}
            <a href={blog.url}> {blog.url}</a>{' '}
          </div>
          <div>
            likes {blog.likes} <button onClick={() => like(blog)}>like</button>
          </div>
          <div>{blog.user.username}</div>
          {canRemove && <button onClick={remove}>delete</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object
  })
}

export default Blog
