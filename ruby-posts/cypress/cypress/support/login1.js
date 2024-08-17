Cypress.Commands.add('login', (email, password) => {
  cy.visit('/users/sign_in');
  cy.get('#user_email').type('user@example.com');
  cy.get('#user_password').type('SecretPassword123');

  cy.get('input[type="submit"]').click();
});
