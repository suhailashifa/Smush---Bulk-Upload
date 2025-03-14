describe('Ultra Smush', () => {

    before(() => {
      // ==== Login ==== 
      cy.visit('https://test3suhaila.tempurl.host/wp-login.php?');
      cy.get('#user_login').type('suhaila.shifa@incsub.com');
      cy.get('#user_pass').type('1234567891011');
      cy.get('#wp-submit').click();
    });
  
    it.skip('Test 1 and 2: Ultra Smush UI Test and Verify Smush from Media library', function() {
      cy.visit('https://test3suhaila.tempurl.host/wp-admin/admin.php?page=smush-bulk');
  
      cy.get('#lossy-level__ultra').click({ force: true }); // Click on Ultra Smush
      cy.get('input[name="auto"]').uncheck({ force: true }); // Uncheck Auto Smush
      cy.get('#save-settings-button').scrollIntoView().click();
  
      // ==== Upload Images ==== 
      cy.uploadMedia(['cypress/fixtures/images/image1.jpg']);
  
      // ==== Start Bulk Smush ==== 
      cy.visit('https://test3suhaila.tempurl.host/wp-admin/admin.php?page=smush-bulk');
      cy.get('.wp-smush-bulk-wrapper').click();
      cy.get('.wp-smush-bo-start').click();
  
      // ==== Verify Smushed Success Notice ==== 
      cy.get('.sui-notice-success', { timeout: 120000 }).should('be.visible').and('contain', 'All attachments have been smushed. Awesome!');
    
      // ==== Verify Smush Ultra ====  //
      cy.visit('https://test3suhaila.tempurl.host/wp-admin/upload.php?mode=list', { timeout: 12000 });
      cy.contains('p.filename', 'image1-scaled.jpg')
        .parents('tr')
        .within(() => {
          cy.get('td.smushit.column-smushit p.smush-status')
            .should('be.visible')
            .and('not.contain', 'Not processed')
            .and('contain', 'images reduced by');
          cy.log('Smush Ultra verified');
        });
    });
  
    it('Test 3: Verify Smushed Image Size', function() {
      const imagePath = 'cypress/fixtures/images/image1.jpg';
  
      cy.visit('https://test3suhaila.tempurl.host/wp-admin/upload.php?mode=list');
      cy.contains('p.filename', 'image1-scaled.jpg')
        .parents('tr')
        .within(() => {
          cy.get('span.download a').invoke('attr', 'href').then((downloadUrl) => {
            cy.readFile(imagePath, 'binary').then((originalImage) => {
              const originalImageSize = originalImage.length;
  
              cy.request({
                url: downloadUrl,
                encoding: 'binary' 
              }).then((response) => {
                const compressedImageSize = response.body.length;
                expect(compressedImageSize).to.be.lessThan(originalImageSize);
                cy.log('Smushed image is smaller in size than original image');
              });
            });
          });
        });
    });
  });