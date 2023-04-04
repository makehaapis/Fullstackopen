const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'test',
        author: 'jest test',
        url: 'www.jest.fi',
        likes: 1
    },
    {
        title: 'test2',
        author: 'jest test2',
        url: 'www.jest.fi2',
        likes: 2
    },
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}