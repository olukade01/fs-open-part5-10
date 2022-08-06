import { useState } from "react"

const Blog = ({blog, handleLike, createMessage}) => {
  const [message, setMessage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    createMessage(blog.id, {comment: message})
    setMessage("")
  }

  if (!blog){
    return null
  }

return (
  <div>
    <h2> {blog.title} {blog.author} </h2>
    <a href='#'>{blog.url}</a>
    <div>{blog.likes} likes <button onClick={() => handleLike(blog.id)}>like</button></div>
    <div>added by {blog.user.name}</div>
     <div>
      <h2>comments</h2>
      <form onSubmit={handleSubmit}> 
      <input value={message} onChange={(e) => setMessage(e.target.value)}/> <button type="submit">add comment</button> </form>
      <ul>{blog.comments.map(comment => <li>{comment}</li>)}</ul>
      </div>
    {/* {blog.user.username === user.username ? <button onClick={() => handleDelete(blog.id, blog.title, blog.author)}>remove</button> : ''} */}
  </div>
)
}

export default Blog