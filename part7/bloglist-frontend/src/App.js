import React, { useState, useEffect, useRef } from 'react'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import getUsers from './services/users'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchData(){
     const users = await getUsers()
     setUsers(users)
    }
    fetchData()
  }, [])

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
  } ,[])

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
    const res = await blogService.getAll()
    setBlogs(res)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createMessage = async(id, comment) => {
    await blogService.createComment(id, comment) 
    const res = await blogService.getAll()

    setBlogs(res)
  }

  // const handleDelete = async(id, title, author) => {
  //   if(window.confirm(`remove blog ${title} by ${author}`)){
  //   await blogService.del(id)
  //   setBlogs(blogs.filter(blog => blog.id !== id))
  // }
  // }

  const loginForm = () =>
      <Togglable buttonLabel ="log in">
        <LoginForm
        message={message}
        createLogin={handleLogin} 
        />      
      </Togglable>

  const blogForm = () => <Togglable buttonLabel="create new" ref={blogFormRef}> <BlogForm createBlog={handleSubmit}/> </Togglable>

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const usersMatch = useMatch('/users/:id')
  const blogsMatch = useMatch('/blogs/:id')
  const oneUser = usersMatch ? users.find(user => user.id === usersMatch.params.id) : null
  const oneBlog = blogsMatch ? blogs.find(blog => blog.id === blogsMatch.params.id) : null

  return (
    <div>
      <h2>blogs</h2>
      {(user === null) ? loginForm() :
      <div>
      {message}
      <Link to='/' style={{padding: 5}}>blogs</Link>
      <Link to='/users'>users</Link>
      <p>{user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route path="/users/:id" element={<User user={oneUser}/>}/>
        <Route path="/users" element={<Users users={users}/>}/>
        <Route path="/blogs/:id" element={<Blog blog={oneBlog} handleLike={handleLike} createMessage={createMessage}/>}/>
        <Route path='/' element={<div>
        {blogForm()}
        <Blogs blogs={sortedBlogs}/>
      </div>}/>
      </Routes>
      </div>}
    </div>
  )
}

export default App