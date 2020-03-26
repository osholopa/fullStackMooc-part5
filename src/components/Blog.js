import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const fullView = () => (
    <div>
      <a target="_blank" rel="noopener noreferrer" href={blog.url}>
        {blog.url}
      </a>
      <br />
      likes: {blog.likes} <button id="likeBtn" onClick={() => handleLike(blog)}>like</button>
      <br />
      {blog.user.name}
      <br />
      {user !== null && blog.user.name === user.name ? (
        <button onClick={() => handleRemove(blog)}>remove</button>
      ) : null}
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button
        onClick={() => {
          setView(!view)
        }}
      >
        {view ? 'hide' : 'view'}
      </button>
      {view ? fullView() : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Blog
