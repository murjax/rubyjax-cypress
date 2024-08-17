describe('auth', function() {
  beforeEach(() => cy.resetdb());

  it('signs up', function() {
    cy.visit('/users/sign_up');
    cy.get('#user_first_name').type('Test');
    cy.get('#user_last_name').type('User');
    cy.get('#user_email').type('user@example.com');
    cy.get('#user_password').type('SecretPassword123');
    cy.get('#user_password_confirmation').type('SecretPassword123');
    cy.get('input[type="submit"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/posts');
  });

  it('signs in', function() {
    cy.factorydb('User', {
      email: 'user@example.com',
      password: 'SecretPassword123',
      first_name: 'Test',
      last_name: 'User'
    });

    cy.visit('/users/sign_in');

    cy.get('#user_email').type('user@example.com');
    cy.get('#user_password').type('SecretPassword123');

    cy.get('input[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/posts');
  });
});
