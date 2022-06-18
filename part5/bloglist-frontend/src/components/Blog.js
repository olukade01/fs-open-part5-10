import React from 'react'
import { useState } from 'react'

const Blog = ({blog, handleLike, handleDelete, user}) => {
  const [visible, setVisible] = useState(false)
  const style = {display: visible ? "" : 'none'}
  const name = visible ? "hide" : "view"
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showFull = () => setVisible(!visible)
  return(
  <div style={blogStyle}>
    <div className="blog">
    {blog.title} {blog.author} <button id="showAll" onClick={showFull}>{name}</button>
    </div>
    <div className='blogContents' style={style}>
    <div>{blog.url}</div>
    <div>likes {blog.likes} <button id="like-button" onClick={() => handleLike(blog.id)}>like</button></div>
    <div>{blog.user.name}</div>
    {blog.user.username === user.username ? <button onClick={() => handleDelete(blog.id, blog.title, blog.author)}>remove</button> : ''}
    </div>
  </div>  
  )
}

export default Blog