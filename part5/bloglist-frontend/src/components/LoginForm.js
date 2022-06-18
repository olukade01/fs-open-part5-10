import { useState } from "react"

const LoginForm = ({ message, createLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
      createLogin({ username, password })
      setUsername('')
      setPassword('')
  }

  return(
    <div>
    <h2>log in to application</h2>
      {message}
    <form onSubmit={handleLogin}>
    <div> username <input
      id="username"
      value={username}
      onChange={({ target }) => setUsername(target.value)}
    /> </div>
    <div> password <input
      id="password"
      value={password}
      onChange={({ target }) => setPassword(target.value)}
      type='password'
    /> </div>
    <button id="login-button" type="submit">login</button>
    </form>
    </div>
  )
}

export default LoginForm