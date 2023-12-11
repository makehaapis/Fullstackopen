import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogFormi = () => {
    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        const blog = {
          title: title,
          author: author,
          url: url,
        }
        if (title && author && url ) {
          event.target.title.value = ''
          event.target.author.value = ''
          event.target.url.value = ''
          dispatch(createBlog(blog))
          dispatch(setNotification(`Added anecdote '${title}'`, 10))
      }
    }

/*return (
<div><h2>create new</h2>
<form onSubmit={addAnecdote}>
  <input name="anecdote"/> 
  <button type="submit">add</button>
</form>
</div>)
}*/

return (
  <div>
    <h4>Create a new blog</h4>

    <form onSubmit={addBlog}>
      <div>
        title
        <input name="title"
          id="title"
          placeholder="title"
        />
      </div>
      <div>
        author
        <input name="author"
          id="author"
          placeholder="author"
        />
      </div>
      <div>
        url
        <input name="url"
          id="url"
          placeholder="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)
}
export default NewBlogFormi