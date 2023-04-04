const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })
  
test('the first author is jest test', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].author).toBe('jest test')
})

test('the identifier to be id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(b => b.id)
    expect(ids).toBeDefined()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'jest test 3',
      url: 'www.jest.fi3',
      likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body[2].title).toBe('async/await simplifies making async calls')
    expect(response.body[2].author).toBe('jest test 3')
    expect(response.body[2].url).toBe('www.jest.fi3')
    expect(response.body[2].likes).toBe(3)
})

test('blog without likes', async () => {
    const newBlog = {
      title: 'if likes not set should return 0',
      author: 'jest test 4',
      url: 'www.jest.fi 4',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
})

test('blog without url return 400', async () => {
    const newBlog = {
      title: 'if likes not set should return 0',
      author: 'jest test 4',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

test('blog without title return 400', async () => {
    const newBlog = {
      author: 'jest test 4',
      url: 'www.wsdfsdf.fi'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(blog => blog.titles)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

test('a blog can be updated', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    
    const updatedBlog = {
        title: 'updated from jest',
        author: 'jest test for updated',
        url: 'www.jest.fi',
        likes: 3
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

      const response = await api.get('/api/blogs')
      expect(response.body[0].title).toBe('updated from jest')
  })


afterAll(async () => {
  await mongoose.connection.close()
})

