describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    const user = {
      name: 'kayttaja',
      username: 'kayttaja',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('kayttaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('kayttaja is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('kayttaja')
      cy.get('#password').type('vaarasalasana')
      cy.get('#login-button').click()
      cy.contains('Error: wrong credentials')
    })
  })

  it('A blog can be created', function() {
    cy.get('#username').type('kayttaja')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('create new blog').click()
    cy.get('input#titleinput').type('title from cypress')
    cy.get('input#authorinput').type('author from cypress')
    cy.get('input#urlinput').type('url from cypress')
    cy.get('#addblogbutton').click()
    cy.contains('title from cypress')
  })

  it('A blog can be liked', function() {
    cy.get('#username').type('kayttaja')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('create new blog').click()
    cy.get('input#titleinput').type('title from cypress')
    cy.get('input#authorinput').type('author from cypress')
    cy.get('input#urlinput').type('url from cypress')
    cy.get('#addblogbutton').click()
    cy.visit('http://localhost:3000')
    cy.contains('show').click()
    cy.contains('Like').click()
  })

  it('User can delete own blog', function() {
    cy.get('#username').type('kayttaja')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('create new blog').click()
    cy.get('input#titleinput').type('title from cypress')
    cy.get('input#authorinput').type('author from cypress')
    cy.get('input#urlinput').type('url from cypress')
    cy.get('#addblogbutton').click()
    cy.visit('http://localhost:3000')
    cy.contains('show').click()
    cy.contains('delete').click()
    cy.contains('title from cypress').should('not.exist')
  })

  it.only('User can not delete others blogs', function() {
    cy.get('#username').type('kayttaja')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('create new blog').click()
    cy.get('input#titleinput').type('title from cypress')
    cy.get('input#authorinput').type('author from cypress')
    cy.get('input#urlinput').type('url from cypress')
    cy.get('#addblogbutton').click()
    cy.get('#logoutbtn').click()

    const user2 = {
      name: 'kayttaja2',
      username: 'kayttaja2',
      password: 'salasana2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
    cy.get('#username').type('kayttaja2')
    cy.get('#password').type('salasana2')
    cy.get('#login-button').click()
    cy.contains('show').click()
    cy.contains('delete').should('not.exist')
  })
})

