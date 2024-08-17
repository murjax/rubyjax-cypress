Cypress.Commands.add('login', { prevSubject: true }, (subject) => {
  const userData = JSON.parse(subject.stdout);
  cy.setCookie('current_user_id', userData.id.toString());
  cy.request('POST', 'http://localhost:3000/__cypress__/force_login', { email: userData.email });
});
