import { useState } from "react"

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({title, author, url})
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return(
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
      <div> title <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        placeholder="title"
        id="title"
      /> </div>
      <div> author <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        placeholder="author"
        id="author"
        /> </div>
      <div> url <input
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        placeholder="url"
        id="url"
        /> </div>
      <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm