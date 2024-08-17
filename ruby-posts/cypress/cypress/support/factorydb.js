Cypress.Commands.add('factorydb', (table, attrs) => {
  attrs = JSON.stringify(attrs).replace(/'/g, "'\\''");
  cy.exec(`RAILS_ENV=test MODEL='${table}' ATTRS='${attrs}' bundle exec rake cypress:insert`);
});
