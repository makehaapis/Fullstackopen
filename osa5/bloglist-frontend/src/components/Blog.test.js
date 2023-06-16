import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const mockHandler = jest.fn()

  beforeEach(() => {
    const username = 'testikayttaja'
    const blog = {
      title: 'testi_title',
      author: 'testi_author',
      url: 'www.test.fi',
      likes: 1,
      user: {
        username: 'testikayttaja',
        name: 'testaaja',
        id: '648ae217af42557d5c8746dc'
      }
    }

    container = render(
      <div className='testDiv'>
        <Blog key={blog.id} blog={blog} username={username} likeBlog={mockHandler} removeBlog={mockHandler}/>
      </div>
    ).container
  })

  test('renders title', () => {
    const element = screen.getByText('testi_title')
    expect(element).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the button, author is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const element = screen.getByText('testi_author')
    expect(element).toBeDefined()
  })

  test('after clicking the button, url is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const element = screen.getByText('testi_author')
    expect(element).toBeDefined()
  })

  test('after clicking the button, user is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const element = screen.getByText('testikayttaja')
    expect(element).toBeDefined()
  })

  test('clicking the button calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})