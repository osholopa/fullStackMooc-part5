import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin } = props

  const login = (event) => {
    event.preventDefault()
    const userObject = {
      username,
      password,
    }
    handleLogin(userObject)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
          username
          <input id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
