describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'jdoe',
      password: 'johndoe123',
    }
    cy.createUser(user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
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

  describe('When a few blogs have been created', function() {
    beforeEach(function() {
      cy.login({ username: 'jdoe', password: 'johndoe123' })
      cy.createBlog({
        title: 'Testing with cypress',
        author: 'Test Author',
        url: 'https://testblog.example.com'
      })

      cy.createBlog({
        title: 'Another Test blog with cypress',
        author: 'Test Author',
        url: 'https://another.example.com'
      })
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
      cy.contains('blogs').parent().should('not.contain', 'Testing with cypress')
      cy.contains('Another Test blog with cypress')
    })

    it('A blog can not be deleted by a wrong user', function() {
      cy.contains('logout').click()
      cy.createUser({ name: 'Another Doe', username: 'adoe', password: 'sekred' })
      cy.login({ username: 'adoe', password: 'sekred' })
      cy.contains('Another Doe logged in')
      cy.contains('Another Test blog with cypress').contains('view').click()
      cy.contains('Another Test blog with cypress').should('not.contain', 'remove')
    })
  })
  describe('Correct rendering order', function() {
    beforeEach(function() {
      cy.login({ username: 'jdoe', password: 'johndoe123' })
      cy.createBlog({
        title: 'Blog with least',
        author: 'Test Author',
        url: 'https://least.example.com'
      })
      cy.createBlog({
        title: 'Blog with second most likes',
        author: 'Test Author',
        url: 'https://second.example.com'
      })
      cy.createBlog({
        title: 'Blog with most likes',
        author: 'Test Author',
        url: 'https://most.example.com'
      })
    })

    it('After added likes renders blogs in correct order', function() {
      cy.contains('Blog with most likes')
        .contains('view')
        .click()
      for(let i = 0; i < 2; i++) {
        cy.contains('Blog with most likes')
          .contains('like')
          .click()
        cy.wait(1000)
      }

      cy.contains('Blog with second most likes')
        .contains('view')
        .click()
      for(let i = 0; i < 1; i++) {
        cy.contains('Blog with second most likes')
          .contains('like')
          .click()
        cy.wait(1000)
      }

      cy.contains('Blog with least')
        .contains('view')
        .click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[2]).should('contain', 'Blog with least')
        cy.wrap(blogs[0]).should('contain', 'Blog with most likes')
        cy.wrap(blogs[1]).should('contain', 'Blog with second most likes')
      })
    })
  })
})