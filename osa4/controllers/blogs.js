const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(400).json({error: "not found"})
  }
})

blogsRouter.post('/', middleware.tokenExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if (body.title === undefined) {
    return response.status(400).end()
  }
  else if (body.url === undefined) {
    return response.status(400).end()
  } else {

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if ( blog.user.toString() === user) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const blogToUpdate = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
  }
  if (blog) {  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
    response.status(200).json(updatedBlog)
  } else {
    return response.status(400).end()
  }
})

module.exports = blogsRouter