import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>Title: </p><input
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
        Author: <input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        />
        Url: <input
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm