import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm calls createBlog with correct information when a blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )
  const form = component.container.querySelector('form')
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: 'Blogin luomisen testausta frontendissa' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Testi Testaaja' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://fronttitestausta.tk' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blogin luomisen testausta frontendissa')
  expect(createBlog.mock.calls[0][0].author).toBe('Testi Testaaja')
  expect(createBlog.mock.calls[0][0].url).toBe('https://fronttitestausta.tk')

})