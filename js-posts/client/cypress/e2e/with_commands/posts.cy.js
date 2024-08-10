describe('posts crud', function() {
  beforeEach(() => {
    cy.resetdb();

    cy.factorydb('users', {
      email: 'user@example.com',
      password: 'Password123',
      first_name: 'Test',
      last_name: 'User'
    }).login({email: 'user@example.com', password: 'Password123'});
  });

  it('index', function() {
    cy.factorydb('posts', {
      name: 'Post Name',
      description: 'Post Description'
    });

    cy.visit('/');
    cy.get('[data-test-id="nav-post-index"]').click();
    cy.get('tbody').should('contain', 'Post Name');
    cy.get('tbody').should('contain', 'Post Description');
    cy.get('tbody').should('contain', 'Test User');
  });

  it('show', function() {
    const responseData = {comments: []};
    const comments = [
      'Comment One',
      'Comment Two',
      'Comment Three'
    ]
    cy.factorydb('posts', {
      name: 'Post Name',
      description: 'Post Description'
    }).then((response) => {
      const post = response.body[0];
      responseData.post = post;

      comments.forEach((comment) => {
        cy.factorydb('comments', {post_id: post.id, text: comment}).then((response) => {
          responseData.comments.push(response.body[0]);
        });
      });
    });

    cy.visit('/');

    cy.get('[data-test-id="nav-post-index"]').click();
    cy.get('[data-test-id="show-post"]').click();
    cy.get('tbody').should('contain', 'Post Name');
    cy.get('tbody').should('contain', 'Post Description');
    cy.get('tbody').should('contain', 'Test User');

    comments.forEach((comment) => {
      cy.get('[data-test-id="comment-list"]').should('contain', comment);
    });
  });

  it('new', function() {
    cy.visit('/');
    cy.get('[data-test-id="nav-post-new"]').click();

    // Validate required fields.
    cy.get('[data-test-id="save-post"]').click();
    cy.get('form').should('contain', 'Name is required');
    cy.get('form').should('contain', 'Description is required');

    cy.get('#name').type('Cypress test post');
    cy.get('#description').type('Cypress test description');
    cy.get('[data-test-id="save-post"]').click();

    cy.get('tbody').should('contain', 'Cypress test post');
    cy.get('tbody').should('contain', 'Cypress test description');
    cy.get('tbody').should('contain', 'Test User');
  });

  it('edit', function() {
    cy.factorydb('posts', {
      name: 'Post Name',
      description: 'Post Description'
    });
    cy.visit('/');

    cy.get('[data-test-id="nav-post-index"]').click();
    cy.get('[data-test-id="edit-post"]').click();
    cy.get('#name').clear();
    cy.get('#name').type('Cypress edited test post');
    cy.get('#description').clear();
    cy.get('#description').type('Cypress edited test description');

    cy.get('[data-test-id="save-post"]').click();
    cy.get('tbody').should('contain', 'Cypress edited test post');
    cy.get('tbody').should('contain', 'Cypress edited test description');
    cy.get('tbody').should('contain', 'Test User');
  });

  it('delete', function() {
    cy.factorydb('posts', {
      name: 'Post Name',
      description: 'Post Description'
    });
    cy.visit('/');

    cy.get('[data-test-id="nav-post-index"]').click();
    cy.get('[data-test-id="delete-post"]').click();
    cy.on('window:confirm', () => true);
    cy.get('tbody').should('not.contain', 'Post Name');
    cy.get('tbody').should('not.contain', 'Post Description');
    cy.get('tbody').should('not.contain', 'Test User');
  });
});
