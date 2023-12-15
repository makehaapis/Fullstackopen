import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
        return action.payload
    },
    appendBlog(state, action) {
        state.push(action.payload)
    },
    addLike(state, action) {
        const id = action.payload.id
        const BlogToChange = state.find(n => n.id === id)
        const changedBlog = {
            ...BlogToChange,
            likes: BlogToChange.likes + 1
        }
        return state.map(blog => blog.id !== id ? blog : changedBlog)
    },
    removeBlog(state, action) {
        return state.filter((blog) => blog.id !== action.payload.id)
    }
  }
})

export const { setBlogs, appendBlog, addLike, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ( blog ) => {
    return async dispatch => {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
    }
  }

  export const likeBlog = ( blog ) => {
    const likedBlog = {
      id: blog.id,
      title: blog.title,
      likes: blog.likes + 1,
      user: blog.user
    }
    console.log(likedBlog)
    return async dispatch => {
      const updatedBlog = await blogService.update(likedBlog)
      dispatch(addLike(updatedBlog))
    }
  }

  export const deleteBlog = ( blog ) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog))
    }
  }

export default blogSlice.reducer