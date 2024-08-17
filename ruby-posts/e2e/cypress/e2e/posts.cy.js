describe('posts', function() {
  beforeEach(() => {
    cy.app('clean');
    cy.appFactories([['create', 'user', { email: 'user@example.com', first_name: 'Test', last_name: 'User' }]]).login()
  });

  it('index', function() {
    cy.getCookie('current_user_id')
      .then((cookie) => {
        cy.appFactories([
          ['create', 'post', { name: 'Post Name', title: 'Post Title', content: 'Post Content', user_id: cookie.value }]
        ]);
      });

    cy.visit('/');
    cy.get('tbody').should('contain', 'Post Name');
    cy.get('tbody').should('contain', 'Post Title');
    cy.get('tbody').should('contain', 'Test User');
  });

  it('show', function() {
    cy.getCookie('current_user_id')
      .then((cookie) => {
        cy.appFactories([
          ['create', 'post', { name: 'Post Name', title: 'Post Title', content: 'Post Content', user_id: cookie.value }]
        ]).then((records) => {
          const post = records[0];
          const comments = [
            ['create', 'comment', { post_id: post.id, content: 'Comment One' }],
            ['create', 'comment', { post_id: post.id, content: 'Comment Two' }],
            ['create', 'comment', { post_id: post.id, content: 'Comment Three' }]
          ];
          cy.appFactories(comments);
        }).then((comments) => {
          cy.visit('/');

          cy.get('[data-test-id="show_post"]').click();
          cy.get('tbody').should('contain', 'Post Name');
          cy.get('tbody').should('contain', 'Post Title');
          cy.get('tbody').should('contain', 'Post Content');
          cy.get('tbody').should('contain', 'Test User');

          comments.forEach((comment) => {
            cy.get('[data-test-id="comment-list"]').should('contain', comment.content);
          });
        });
      });
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

  it('edit', function() {
    cy.appFactories([
      ['create', 'post', { name: 'Post Name', title: 'Post Title', content: 'Post Content' }]
    ]);

    cy.visit('/');

    cy.get('[data-test-id="edit_post"]').click();
    cy.get('#post_name').clear();
    cy.get('#post_name').type('Cypress edited test post');
    cy.get('#post_title').clear();
    cy.get('#post_title').type('Cypress edited test title');
    cy.get('#post_content').clear();
    cy.get('#post_content').type('Cypress edited test content');

    cy.get('input[type="submit"]').click();
    cy.get('tbody').should('contain', 'Cypress edited test post');
    cy.get('tbody').should('contain', 'Cypress edited test title');
    cy.get('tbody').should('contain', 'Cypress edited test content');
    cy.get('tbody').should('contain', 'Test User');
  });

  it('delete', function() {
    cy.appFactories([
      ['create', 'post', { name: 'Post Name', title: 'Post Title', content: 'Post Content' }]
    ]);

    cy.visit('/');

    cy.get('[data-test-id="delete_post"]').click();
    cy.on('window:confirm', () => true);
    cy.get('tbody').should('not.contain', 'Post Name');
    cy.get('tbody').should('not.contain', 'Post Title');
    cy.get('tbody').should('not.contain', 'Post Content');
    cy.get('tbody').should('not.contain', 'Test User');
  });
});
