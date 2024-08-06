describe('sign up', function() {
  beforeEach(() => cy.resetdb());

  it('signs up', function() {
    cy.visit('/sign_up');
    cy.get('.SignUp').should('contain', 'Sign Up');

    cy.get('input[type="submit"]').click();
    cy.get('.SignUp').should('contain', 'First name is required');
    cy.get('.SignUp').should('contain', 'Last name is required');
    cy.get('.SignUp').should('contain', 'Email is required');
    cy.get('.SignUp').should('contain', 'Password is required');

    cy.get('#firstName').type('Test');
    cy.get('#lastName').type('User');
    cy.get('#email').type('user3@example.com');
    cy.get('#password').type('Password123');

    cy.get('input[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/posts');

    cy.get('[data-test-id="nav-sign-out"]').click();
  });

  it('signs in', function() {
    cy.factorydb('users', {
      email: 'user@example.com',
      password: 'Password123',
      first_name: 'Test',
      last_name: 'User'
    });

    cy.visit('/sign_in');
    cy.get('.SignIn').should('contain', 'Sign In');

    cy.get('input[type="submit"]').click();
    cy.get('.SignIn').should('contain', 'Email is required');
    cy.get('.SignIn').should('contain', 'Password is required');

    cy.get('#email').type('user@example.com');
    cy.get('#password').type('Password123');

    cy.get('input[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/posts');
  });
});
