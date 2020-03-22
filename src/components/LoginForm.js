import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = (props) => {
    const { setUser, setNotification, username, password, setUsername, setPassword } = props

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username, password
          })
    
          window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
          setNotification({ message: "login successful", type: "info" })
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 3000)
        } catch (exception) {
          setNotification({ message: "wrong username or password", type: "error" })
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
        }
      }

    return (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
            <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
            <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default LoginForm