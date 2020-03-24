import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { blogFormRef, setNotification, setBlogs, blogs } = props

  const addBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
      const response = await blogService.create(newBlog)
      setNotification({
        message: `a new blog ${title} by ${author} added`,
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
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default BlogForm
