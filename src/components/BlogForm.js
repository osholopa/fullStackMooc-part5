import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const {setNotification, setBlogs, blogs} = props

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        try {
            const response = await blogService.create(newBlog)
            setNotification({ message: `a new blog ${title} by ${author} added`, type: "info" })
            setTimeout(() => {
                setNotification({ message: null, type: null })
            }, 3000)
            setBlogs(blogs.concat(response))
        } catch (exception) {
            setNotification({ message: exception.message, type: "error" })
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

export default BlogForm