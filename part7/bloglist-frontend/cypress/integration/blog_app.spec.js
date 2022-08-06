describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3004/api/testing/reset");
    const user = {
      name: 'muhammad',
      username: 'muzzammil',
      password: 'adebayo'
    }
    cy.request('POST', 'http://localhost:3004/api/users/', user) 
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("blogs");
    cy.contains("log in").click();
    cy.contains("log in to application");
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function(){
      cy.contains("log in").click();
      cy.get('#username').type('muzzammil')
      cy.get('#password').type('adebayo')
      cy.get('#login-button').click()
      cy.contains("muhammad logged in")
    })

    it('fails with wrong credentials', function(){
      cy.contains("log in").click();
      cy.get('#username').type('muzzammil')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains("Wrong username or password")
      cy.get('html').should('not.contain', 'muhammad logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'muzzammil', password: 'adebayo' })
    })

    it('a new blog can be created', function() {
      cy.contains('create new').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('olukade')
      cy.get('#url').type('just blog')
      cy.get('#create-blog').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function(){
      beforeEach(function(){
        cy.createBlog({title: 'the', author: 'last', url: 'blog'})
      })
      it.only('users can like a blog', function() {
        cy.get('#showAll').click()
        cy.get('#like-button').click().trigger('change')
      })

      it('user who created a blog can delete it', function (){

      })
    })
  })
});
