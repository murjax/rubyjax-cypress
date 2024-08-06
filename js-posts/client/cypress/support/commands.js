// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('resetdb', () => {
  cy.exec('cd ../server && npm run db:truncate', { log: true });
});

Cypress.Commands.add('factorydb', (table, attrs) => {
  cy.request({
    method: 'POST',
    url: `http://localhost:3001/${table}`,
    headers: {
      'Authorization': localStorage.getItem('js-posts-auth-token')
    },
    body: attrs
  });
});

Cypress.Commands.add('login', { prevSubject: true }, (subject, credentials) => {
  cy.request('POST', `http://localhost:3001/login`, credentials).then((response) => {
    localStorage.setItem('js-posts-auth-token', response.body.token);
  });
});
