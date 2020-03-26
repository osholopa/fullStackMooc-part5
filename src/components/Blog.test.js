import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'Komponenttien testausta',
    author: 'Testi Testinen',
    url: 'https://komponenttientestausta.blog.invalid',
    likes: 2,
  }

  const component = render(
    <Blog blog={blog} handleLike={() => {}} handleRemove={() => {}} />
  )
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent('likes:')
})

test('shows also url and likes after "view" button has been pressed', () => {
  const blog = {
    title: 'Nappien painelun testausta',
    author: 'Testi Testinen',
    url: 'https://komponenttientestausta.blog.invalid',
    likes: 2,
    user: {
      username: 'testikayttaja',
      name: 'Testi Testinen'
    }
  }

  const user = {
    name: 'Testi Käyttäjä'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleLike={() => {}} handleRemove={() => {}} />
  )

  const button = component.getByText('view')
  button.onclick = mockHandler
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(1)
  
  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(`likes: ${blog.likes}`)
})

test('two "like" button presses result in two handleLike method calls', () => {
  const blog = {
    title: 'Nappien painelun testausta',
    author: 'Testi Testinen',
    url: 'https://komponenttientestausta.blog.invalid',
    likes: 2,
    user: {
      username: 'testikayttaja',
      name: 'Testi Testinen'
    }
  }

  const user = {
    name: 'Testi Käyttäjä'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler} handleRemove={() => {}} />
  )

  const viewBtn = component.getByText('view')
  fireEvent.click(viewBtn)
  const likeBtn = component.container.querySelector('#likeBtn')
  fireEvent.click(likeBtn)
  expect(mockHandler.mock.calls.length).toBe(1)
  fireEvent.click(likeBtn)
  expect(mockHandler.mock.calls.length).toBe(2)
})
