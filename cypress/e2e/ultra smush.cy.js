describe('Ultra Smush', () => {
  
  it('Ultra Smush UI test', function() {
    /* ==== Login ==== */
    cy.visit('https://test3suhaila.tempurl.host/wp-login.php?');
    cy.get('#user_login').type('suhaila.shifa@incsub.com');
    cy.get('#user_pass').type('1234567891011');
    cy.get('#wp-submit').click();

    /* ==== Skip Welcome Modal ==== */
    // cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush');
    // cy.wait(2000);
    // // Check if the onboarding modal exists before proceeding
    // cy.get('body').then(($body) => {
    //   if ($body.find('div#smush-onboarding-content.loaded').length > 0) {
    //     // If modal exists, click the skip button
    //     cy.get('.sui-modal-skip.smush-onboarding-skip-link').click();
    //   }
    // });

    /* ==== Test 1 ==== */
    cy.visit('https://test3suhaila.tempurl.host/wp-admin/admin.php?page=smush-bulk');
    
    cy.get('#lossy-level__ultra').click({ force: true }); // Click on Ultra Smush
    cy.get('input[name="auto"]').uncheck({ force: true }); // Uncheck Auto Smush
    //cy.get('#auto');
    cy.get('#save-settings-button').scrollIntoView().click();

     /* ==== Navigates to Media and Uploads 8 Images ==== */
    cy.uploadMedia([
      'cypress/fixtures/images/image1.jpg'
    ]);

    /* ==== Start Bulk Smush Images ==== */ 
    cy.visit('https://test3suhaila.tempurl.host/wp-admin/admin.php?page=smush-bulk');
    cy.get('.wp-smush-bulk-wrapper').click();//check if Bulk Smush button is visible
    cy.get('.wp-smush-bo-start').click();//click on Bulk Smush button

    /* ==== Checks Smushed Success Notice ==== */   
    // Wait for the progress bar to complete and check if the message exists
    cy.get('.sui-notice-success', { timeout: 120000 }).should('be.visible').and('contain', 'All attachments have been smushed. Awesome!');
    
    /* ==== Test 2 ==== */
    //Looks for reduced by Smush
    cy.visit('https://test3suhaila.tempurl.host/wp-admin/upload.php?mode=list');
    cy.contains('p.filename', 'image1-scaled.jpg') // Find the image row by image name
    .parents('tr')                                // Move to the parent <tr> to ensure you're in the same row
    .within(() => {
    // Verify 'Smush Ultra' column
    cy.get('td.smushit.column-smushit p.smush-status')
      .should('be.visible')
      .and('not.contain', 'Not processed')
      .and('contain', 'images reduced by');
    
      cy.log('Smush Ultra verified');
    // Click the 'Download' link
    //cy.get('div.row-actions .download').click();
    });

    /* ==== Test 3 ==== */
    // Checks Smushed Image Size
    const imagePath = 'cypress/fixtures/images/image1.jpg'; // Original image path

        cy.visit('https://test3suhaila.tempurl.host/wp-admin/upload.php?mode=list');
        cy.contains('p.filename', 'image1-scaled.jpg') // Find the image by name
        .parents('tr') // Move to the parent <tr>
        .within(() => {
            // Step 1: Get the Download URL
            cy.get('span.download a').invoke('attr', 'href').then((downloadUrl) => {
            // Step 2: Read the original image size from fixtures
            cy.readFile(imagePath, 'binary').then((originalImage) => {
                    const originalImageSize = originalImage.length;

                    // Step 3: Request and compare the smushed image size
                    cy.request({
                    url: downloadUrl,
                    encoding: 'binary' 
                    }).then((response) => {
                    const compressedImageSize = response.body.length;
                    
                    // Step 4: Assertion - Compressed image should be smaller
                    expect(compressedImageSize).to.be.lessThan(originalImageSize);
                    cy.log('Smushed Image is smaller in size than original image');
              });
            });
          });
        });
  });
})