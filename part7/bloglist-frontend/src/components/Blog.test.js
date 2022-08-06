import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import Blogs from './Blogs'

describe("when there's a blog", () => {
  let container
  let mockHandler
  beforeEach(() => {
    const blog = {
      title: 'frontend',
      author: 'testing',
      url: 'mio mo',
      user: {
        name: 'muzzammil',
        username: 'muhammad'
      }
    }
    const user = {
      username: "muhammad"
    }
    mockHandler = jest.fn()
  
    container = render(<Blogs user={user} handleLike={mockHandler} blog={blog}/>).container
  })
  test('renders title and author but not likes and url by default', () => {
    const div = container.querySelector('.blogContents')
    expect(div).toHaveStyle('display: none')
    const div1 = container.querySelector('.blog')
    expect(div1).toHaveTextContent("frontend")
    expect(div1).toHaveTextContent("testing")
    expect(div1).not.toHaveTextContent("mio mo")
  })
  
  test("url and likes are shown when button clicked", () => {
    const button = screen.getByText('view')
    userEvent.click(button)
    const div = container.querySelector('.blogContents')
    expect(div).not.toHaveStyle('display: none')
    const element = screen.getByText('mio mo')
    expect(element).toBeDefined()
  })

  test("clicking like button twice calls event handler twice", () => {
    const button = screen.getByText('like')
    userEvent.dblClick(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  render(<BlogForm createBlog={createBlog}/>)

  const input = screen.getByPlaceholderText('title')
  const input1 = screen.getByPlaceholderText('author')
  const input2 = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  userEvent.type(input, 'blogform')
  userEvent.type(input1, 'testing')
  userEvent.type(input2, 'here')
  userEvent.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blogform')
  expect(createBlog.mock.calls[0][0].author).toBe('testing')
  expect(createBlog.mock.calls[0][0].url).toBe('here')
})