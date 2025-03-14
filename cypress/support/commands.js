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
import 'cypress-file-upload';

Cypress.Commands.add('uploadMedia', (filePaths) => {

	// Visit the media upload page in the WordPress admin.
	//cy.visit(utils.getDynURL({ notNetwork: true }) + 'upload.php');
    cy.visit('https://test3suhaila.tempurl.host/wp-admin/upload.php?mode=grid');

	// Switch to list view.
	cy.get('.view-list').click();

	// Click the 'Add New Media File' button.
	cy.get('.page-title-action').click();

	cy.get('.drag-drop').should('exist');
	cy.get('#drag-drop-area').should('exist');

	cy.wrap(filePaths).each((filePath, index) => {
		cy.intercept('POST', 'async-upload.php').as(`uploadMediaRequest${index}`);

		cy.get('#drag-drop-area').selectFile(filePath, { action: 'drag-drop' });

		cy.get('.progress', { timeout: 10000 }).should('exist');

		cy.wait(`@uploadMediaRequest${index}`, { responseTimeout: 100000 }).then((response) => {
			if (response.state === 'Complete') {
				cy.log(`Uploaded file: ${filePath}`);
			} else {
				cy.get('.media-item .error-div.error').then((ele) => {
					let errorMessage = ele ? ele.text().replace('Dismiss', '') : '';
					cy.log(`Failed to upload file: ${filePath}, error: ${errorMessage}`);
				});
			}
		});

		cy.get('.progress', { timeout: 100000 }).should('not.exist');
	});
});