describe('Smush Plugin Automation', () => {

    it('Gutenberg Smush Integration', () => {

        // Login
        cy.visit('https://test2suhailashifa.tempurl.host/wp-login.php?');
        cy.get('#user_login').type('suhaila.shifa@incsub.com');
        cy.get('#user_pass').type('1234567891011');
        cy.get('#wp-submit').click();

        // Check if the onboarding modal exists before proceeding
        // cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush');
        // cy.wait(2000);
        // cy.get('body').then(($body) => {
        //     if ($body.find('div#smush-onboarding-content.loaded').length > 0) {
        //       // If modal exists, click the skip button
        //       cy.get('.sui-modal-skip.smush-onboarding-skip-link').click();
        //     }
        //   });

        // Step 1: Navigate to Smush > Bulk Smush > Settings and Enable "Automatic Compression"
        cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush-bulk'); 
        cy.get('input[name="auto"]').scrollIntoView().check({ force: true }).should('be.checked');
        cy.get('#save-settings-button').click();

        // Step-2: Navigate to Smush > Integrations and Enable "Gutenberg Support"
        cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush-integrations');
        cy.get('input[name="gutenberg"]').scrollIntoView().check({ force: true }).should('be.checked');
        cy.get('#save-settings-button').click();
    
        // Step-3: Go to Pages -> Add New
        cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/post-new.php?post_type=page',{ timeout: 60000 });
        //cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/post.php?post=1664&action=edit',{ timeout: 120000 }); // Edit an existing page for test purpose

        // Step-3a: Enter Title
        cy.get('.editor-post-title__input').type('Cypress Test Page');

        // Step-3b: Upload Image
        cy.wait(20000); // Wait for 5 seconds before interacting
        cy.get('button[aria-label="Add block"]').click(); // Click "Add block" button
        cy.get('.block-editor-inserter__panel-content').should('be.visible'); // Wait for the block inserter to appear
        cy.get('.components-button.block-editor-block-types-list__item.editor-block-list-item-image').click({ force: true }); // Click "Image" block
        cy.wait(20000); // Wait for 5 seconds before interacting     

        cy.contains('button', 'Upload').click({ force: true }); // Click "Upload" button
        cy.get('input[type="file"][data-testid="form-file-upload-input"]').selectFile('cypress/fixtures/images/image1.jpg', { force: true }); // Select an image from fixture folder to upload

        // Step-3c: Wait for the image to upload and click on it to view if 'Smush Stats' are displayed
        cy.get('.components-spinner', { timeout: 120000 }).should('not.exist'); //wait for the spinner to disappear      
        cy.get('.components-resizable-box__container .has-show-handle').click(); // Click on the uploaded image

        cy.get('#edit-post\\:block', { timeout: 10000 }).should('be.visible'); // Side panel>Block should appear
        cy.contains('.components-panel__body-toggle', 'Smush Stats', { timeout: 20000 }).should('be.visible').click(); // Wait for the "Smush Stats" section to appear

        //Step-3d: Click on the body container and repeat the same steps and wait for the Smush details to fully load
        cy.get('.editor-styles-wrapper').click(200, 200); // Click at x:200, y:200 inside the editor and wait for 5 seconds
        cy.get('.components-resizable-box__container .has-show-handle').click(); // Click on the uploaded image
        cy.get('#edit-post\\:block', { timeout: 10000 }).should('be.visible'); // Side panel>Block should appear

        //Tried to expand tghe Smush stats section (didn't work for some reason)
        cy.get('.components-panel__body-toggle')
            .contains('Smush Stats')
            .then(($button) => {
                if (!$button.hasClass('is-open')) { // If not already expanded
                cy.wrap($button).click(); // Expand it
                }
            });
        cy.contains('.components-panel__body-toggle', 'Smush Stats', { timeout: 20000 }).should('be.visible').click(); // Wait for the "Smush Stats" section to appear
        
        
        
    });

});
