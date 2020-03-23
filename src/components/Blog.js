import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, user}) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const newObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const id = blog.id
    const returnedBlog = await blogService.update(id, newObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const id = blog.id
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const fullView = () => (
    <div>
      <a target="_blank" rel="noopener noreferrer" href={blog.url}>{blog.url}</a><br />
  likes: {blog.likes} <button onClick={handleLike}>like</button><br />
      {blog.user.name}<br />
      {user !== null && blog.user.name === user.name ? <button onClick={handleRemove}>remove</button> : null}
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => { setView(!view) }}>{view ? "hide" : "view"}</button>
      {view ? fullView() : null}
    </div>
  )
}

export default Blog
