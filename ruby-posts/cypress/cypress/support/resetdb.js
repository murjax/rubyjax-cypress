Cypress.Commands.add('resetdb', () => {
  cy.exec('RAILS_ENV=test bundle exec rails db:schema:load', { log: true });
});
