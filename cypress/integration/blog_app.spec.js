describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'jdoe',
      password: 'johndoe123',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
})  

  describe.only('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jdoe')
      cy.get('#password').type('johndoe123')
      cy.get('#login-button').click()

      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('nonexistent1')
      cy.get('#password').type('iwillbreakeverything')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jdoe', password: 'johndoe123' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Testing with cypress')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('https://testblog.example.com')
      cy.get('#create-button').click()

      cy.contains('Testing with cypress Test Author')
    })
  })

  describe('When a blog has been created', function() {
    beforeEach(function() {
      cy.login({ username: 'jdoe', password: 'johndoe123' })
      cy.contains('new blog').click()
      cy.get('#title').type('Testing with cypress')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('https://testblog.example.com')
      cy.get('#create-button').click()
    })

    it('A blog can be liked', function() {
      cy.contains('Testing with cypress')
        .get('#toggleView')
        .click()
      cy.get('#likeBtn').click()
      cy.contains('likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('Testing with cypress')
        .get('#toggleView')
        .click()
      cy.contains('remove').click()
      cy.parent.should('not.contain', 'Testing with cypress')
    })
  })

