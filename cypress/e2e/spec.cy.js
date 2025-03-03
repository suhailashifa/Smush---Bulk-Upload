describe('manual bulk smush', () => {

  
  it('manual bulk', function() {
    /* ==== Login ==== */
    cy.visit('https://test2suhailashifa.tempurl.host/wp-login.php?');
    cy.get('#user_login').type('suhaila.shifa@incsub.com');
    cy.get('#user_pass').type('1234567891011');
    cy.get('#wp-submit').click();

    /* ==== Skip Welcome Modal ==== */
    cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush');
    cy.wait(2000);
    // Check if the onboarding modal exists before proceeding
    cy.get('body').then(($body) => {
      if ($body.find('div#smush-onboarding-content.loaded').length > 0) {
        // If modal exists, click the skip button
        cy.get('.sui-modal-skip.smush-onboarding-skip-link').click();
      }
    });

    /* ==== Check if the 'Smush Bulk Settings' are set to the default value ==== */ 
    cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush-bulk'); 
    cy.get('input[name="lossy"][value="0"]').should('be.checked'); // Default "Basic" is checked
    //cy.get('#lossy-level__basic').should('have.class', 'active');
    cy.get('input[name="wp-smush-auto-image-sizes"][value="all"]').should('be.checked'); // Default "Image Sizes" is checked
    cy.get('input[name="auto"]').should('be.checked'); // Default "Auto Compression" is checked
    cy.get('input[name="strip_exif"]').should('be.checked'); // Default "Strip EXIF Data" is checked
    cy.get('input[name="resize"]').should('not.be.checked'); // Default "Resize original images" is not checked
    cy.get('input[name="no_scale"][value="1"]').should('not.be.checked'); // Default Disabled Scaled Images is not checked
    cy.get('input[name="original"]').should('not.be.checked'); // Default "Optimize Original Images" is not checked
    cy.get('input[name="backup"]').should('not.be.checked'); // Default "Backup Images" is not checked
    cy.get('input[name="png_to_jpg"]').should('not.be.checked'); // Default "Convert PNG to JPEG" is not checked
    cy.get('input[name="background_email"]').should('not.be.checked'); // Default "Background Image Compression" is not checked

    /* ==== Navigate to Smush and Disable Auto Compression ==== */
    cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush-bulk');
    //cy.get('#auto').scrollIntoView().uncheck();
    //cy.get('input[name="auto"]').scrollIntoView().should('be.visible').uncheck();
    cy.get('input[name="auto"]').scrollIntoView().uncheck({ force: true });
    cy.get('#auto');
    cy.get('#save-settings-button').click();

    /* ==== Navigates to Media and Uploads 8 Images ==== */
    cy.uploadMedia([
      'cypress/fixtures/images/image1.jpg', 'cypress/fixtures/images/image2.jpg',
      'cypress/fixtures/images/image3.jpg','cypress/fixtures/images/image4.jpg',
      'cypress/fixtures/images/image5.jpg','cypress/fixtures/images/image6.jpg',
      'cypress/fixtures/images/image7.jpg','cypress/fixtures/images/image8.jpg'
    ]);

    /* ==== Start Bulk Smush Images ==== */ 
    cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush-bulk');
    cy.get('.wp-smush-bulk-wrapper').click();//check if Bulk Smush button is visible
    cy.get('.wp-smush-bo-start').click();//click on Bulk Smush button

    /* ==== Checks Smushed Success Notice ==== */   
    // Wait for the progress bar to complete and check if the message exists
    cy.get('.sui-notice-success', { timeout: 120000 })
      .invoke('removeClass', 'sui-hidden') // Force visibility if hidden
      .should('be.visible');
    

    /* ==== Matches Summary Box values of 'Bulk Smush' page with 'Smush Dashboard' page's ==== */
    //cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush-bulk');
    // Wait for the summary box to be visible
    cy.get('#smush-box-summary', { timeout: 10000 }).should('be.visible');
    cy.get('#smush-box-summary').then(($summary) => {         
      const imageOptimizedPercent = $summary.find('span > .sui-circle-score-label').text().trim();
      const totalSavingsMB = $summary.find('.sui-summary-large').text().trim();
      const totalSavingsPercent = $summary.find('.wp-smush-savings > .wp-smush-stats-percent').text().trim();      
      const imagesSmushed = $summary.find('.wp-smush-count-total > .sui-summary-detail').text().trim();
      
      cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush');
      cy.get('#smush-box-dashboard-summary', { timeout: 10000 }).should('be.visible');
      cy.get('#smush-box-dashboard-summary').should('contain', imageOptimizedPercent);
      cy.get('#smush-box-dashboard-summary').should('contain', totalSavingsMB);
      cy.get('#smush-box-dashboard-summary').should('contain', totalSavingsPercent);
      cy.get('#smush-box-dashboard-summary').should('contain', imagesSmushed);
    });

    /* ==== Reset Smush Settings ==== */
    cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush-settings&view=data');
    cy.get('[for="keep_data-false"]').click();
    cy.get('#keep_data-false').check();
    cy.get('#data-uninstallation-settings-row > .sui-box-settings-col-2 > .sui-button').click();
    cy.get('#reset-settings-dialog > .sui-box > .sui-box-body').click();
    cy.get('#reset-setting-confirm').click();
    cy.log('Reset done');

  });
})