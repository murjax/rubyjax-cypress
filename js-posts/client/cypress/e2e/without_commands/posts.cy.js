describe('posts crud', function() {
  it('performs crud actions on posts', function() {
    // Sign in cypress user
    cy.visit('/sign_in');

    cy.get('.SignIn').should('contain', 'Sign In');

    cy.get('input[type="submit"]').click();
    cy.get('.SignIn').should('contain', 'Email is required');
    cy.get('.SignIn').should('contain', 'Password is required');

    cy.get('#email').type('cypressuser@example.com');
    cy.get('#password').type('Password123');

    cy.get('input[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/posts');

    // New
    cy.get('[data-test-id="nav-post-new"]').click();

    // Validate required fields.
    cy.get('[data-test-id="save-post"]').click();
    cy.get('form').should('contain', 'Name is required');
    cy.get('form').should('contain', 'Description is required');

    cy.get('#name').type('Cypress test post');
    cy.get('#description').type('Cypress test description');
    cy.get('[data-test-id="save-post"]').click();

    // Index
    cy.get('tbody').should('contain', 'Cypress test post');
    cy.get('tbody').should('contain', 'Cypress test description');
    cy.get('tbody').should('contain', 'Cypress User');

    // Show
    cy.get('[data-test-id="show-post"]').click();
    cy.get('tbody').should('contain', 'Cypress test post');
    cy.get('tbody').should('contain', 'Cypress test description');
    cy.get('tbody').should('contain', 'Cypress User');

    cy.get('[data-test-id="nav-post-index"]').click();

    // Edit
    cy.get('[data-test-id="edit-post"]').click();
    cy.get('#name').clear();
    cy.get('#name').type('Cypress edited test post');
    cy.get('#description').clear();
    cy.get('#description').type('Cypress edited test description');

    cy.get('[data-test-id="save-post"]').click();
    cy.get('tbody').should('contain', 'Cypress edited test post');
    cy.get('tbody').should('contain', 'Cypress edited test description');
    cy.get('tbody').should('contain', 'Cypress User');

    cy.get('[data-test-id="delete-post"]').click();
    cy.on('window:confirm', () => true);
    cy.get('tbody').should('not.contain', 'Cypress edited test post');
    cy.get('tbody').should('not.contain', 'Cypress edited test description');
    cy.get('tbody').should('not.contain', 'Cypress User');
  });
});
