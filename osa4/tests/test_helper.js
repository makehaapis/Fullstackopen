const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

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

const initialUsers = [
  {
    username: "Marko",
    password: bcrypt.hash('sekret', 10),
  },
  {
    username: "Marko2",
    password: bcrypt.hash('sekret', 10),
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}