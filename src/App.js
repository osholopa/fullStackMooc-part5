import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const blogFormRef = React.createRef()

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        <LoginForm setUser={setUser} setNotification={setNotification} /> :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} setNotification={setNotification} blogs={blogs} setBlogs={setBlogs} />
          </Togglable>
        </div>
      }
      <h2>blogs</h2>
      {blogs.sort((a, b) => a.likes > b.likes ? -1 : 1).map(blog =>
        <Blog key={blog.id} user={user} blog={blog} setBlogs={setBlogs} blogs={blogs} />
      )}
    </div>
  )
}

export default App