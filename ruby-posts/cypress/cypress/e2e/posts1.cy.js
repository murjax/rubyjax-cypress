describe('posts', function() {
  beforeEach(() => {
    cy.resetdb();

    cy.factorydb('User', {
      email: 'user@example.com',
      password: 'Password123',
      first_name: 'Test',
      last_name: 'User'
    });
    cy.login('user@example.com', 'Password123');
  });

  it('new', function() {
    cy.visit('/');
    cy.get('[data-test-id="posts_options"]').click();
    cy.get('[data-test-id="new_post"]').click();

    // Validate required fields.
    cy.get('input[type="submit"]').click();
    cy.get('main').should('contain', 'Name can\'t be blank');
    cy.get('main').should('contain', 'Title can\'t be blank');
    cy.get('main').should('contain', 'Content can\'t be blank');

    cy.get('#post_name').type('Cypress test post');
    cy.get('#post_title').type('Cypress test title');
    cy.get('#post_content').type('Cypress test content');
    cy.get('input[type="submit"]').click();

    cy.get('tbody').should('contain', 'Cypress test post');
    cy.get('tbody').should('contain', 'Cypress test title');
    cy.get('tbody').should('contain', 'Cypress test content');
    cy.get('tbody').should('contain', 'Test User');
  });
});
