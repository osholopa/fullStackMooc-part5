import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotification({ message: 'login successful', type: 'info' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 3000)
      setUser(user)
    } catch (exception) {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const blogFormRef = React.createRef()

  const handleLike = async blog => {
    const newObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    const id = blog.id
    const returnedBlog = await blogService.update(id, newObject)
    setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))
  }

  const handleRemove = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const id = blog.id
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const createBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'info',
      })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 3000)
      setBlogs(blogs.concat(response))
    } catch (exception) {
      setNotification({ message: exception.message, type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map(blog => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        ))}
    </div>
  )
}

export default App
