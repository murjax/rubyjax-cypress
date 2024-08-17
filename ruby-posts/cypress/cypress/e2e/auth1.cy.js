describe('auth', function() {
  it('signs up and signs in', function() {
    cy.resetdb();
    cy.visit('/users/sign_up');

    cy.get('input[type="submit"]').click();
    cy.get('#error_explanation').should('contain', 'Email can\'t be blank');
    cy.get('#error_explanation').should('contain', 'Password can\'t be blank');

    cy.get('#user_first_name').type('Test');
    cy.get('#user_last_name').type('User');
    cy.get('#user_email').type('user@example.com');
    cy.get('#user_password').type('SecretPassword123');
    cy.get('#user_password_confirmation').type('SecretPassword123');
    cy.get('input[type="submit"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/posts');

    cy.get('[data-test-id="full-account-options"]').click();
    cy.get('[data-test-id="sign_out"]').click();
    cy.visit('/users/sign_in');

    cy.get('input[type="submit"]').click();
    cy.get('main').should('contain', 'Invalid Email or password');
    cy.get('#user_email').type('user@example.com');
    cy.get('#user_password').type('SecretPassword123');

    cy.get('input[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/posts');
  });
});
