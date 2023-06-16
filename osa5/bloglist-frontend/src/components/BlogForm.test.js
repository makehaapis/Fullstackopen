import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={addBlog}/>)

  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form title...' )
  await user.type(authorInput, 'testing a form author...' )
  await user.type(urlInput, 'testing a form url...' )
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing a form title...' )
  expect(addBlog.mock.calls[0][0].author).toBe('testing a form author...' )
  expect(addBlog.mock.calls[0][0].url).toBe('testing a form url...' )
})