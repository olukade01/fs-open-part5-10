import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchData(){
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (object) => {
    try{
      const user = await loginService(object)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    }catch (exception){
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleSubmit = async (newObject) => {
    try{
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(newObject)
    setBlogs(blogs.concat(blog))
    setMessage(`a new blog ${newObject.title} by ${newObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    } catch (exception) {
      setMessage("title and author required")
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLike = async(id) => {
    await blogService.update(id)
    // console.log(newBlog);
    // setBlogs(blogs.map(blog => blog.id !== id ? blog : newBlog))
    const res = await blogService.getAll()
    setBlogs(res)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleDelete = async(id, title, author) => {
    if(window.confirm(`remove blog ${title} by ${author}`)){
    await blogService.del(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }
  }

  const loginForm = () =>
      <Togglable buttonLabel ="log in">
        <LoginForm
        message={message}
        createLogin={handleLogin} 
        />      
      </Togglable>

  const blogForm = () => <Togglable buttonLabel="create new" ref={blogFormRef}> <BlogForm createBlog={handleSubmit}/> </Togglable>

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {(user === null) ? loginForm() :
      <div>
      {message}
      <p>{user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>
      )}
      </div>}
    </div>
  )
}

export default App