describe('manual bulk smush', () => {

  
  it('manual bulk', function() {
    /* ==== Login ==== */
    cy.visit('https://test2suhailashifa.tempurl.host/wp-login.php?');
    cy.get('#user_login').type('suhaila.shifa@incsub.com');
    cy.get('#user_pass').type('1234567891011');
    cy.get('#wp-submit').click();

      /* ==== Navigate to Smush and Disable Auto Compression ==== */
      cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush-bulk');
      cy.get('.sui-modal-skip').click(); //skip modal
      cy.get('#toplevel_page_smush > .wp-submenu > :nth-child(3) > a').click(); //click on Bulk Smush Sub-Menu
      cy.get('#column-auto > .sui-form-field > .sui-toggle > .sui-toggle-slider').click();//uncheck auto smush
      cy.get('#auto').uncheck();
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
    //cy.get('.sui-notice-success', { timeout: 120000 }).should('be.visible');
    cy.get('.sui-notice-success', { timeout: 120000 })
      .invoke('removeClass', 'sui-hidden') // Force visibility if hidden
      .should('be.visible');
    
    // Option 2: If the success message never appears, wait for another UI change
    cy.get('.sui-button wp-smush-scan wp-smush-background-scan', { timeout: 120000 }).should('be.visible');

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
  });
})