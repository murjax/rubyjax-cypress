describe('sign up', function() {
  it('signs up and signs in', function() {
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

    cy.visit('/sign_in');

    cy.get('.SignIn').should('contain', 'Sign In');

    cy.get('input[type="submit"]').click();
    cy.get('.SignIn').should('contain', 'Email is required');
    cy.get('.SignIn').should('contain', 'Password is required');

    cy.get('#email').type('user3@example.com');
    cy.get('#password').type('Password123');

    cy.get('input[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/posts');
  });
});
