describe('manual bulk smush', () => {

  
  it('manual bulk', function() {
    /* ==== Login ==== */
    cy.visit('https://test3suhaila.tempurl.host/wp-login.php');
    cy.get('#user_login').type('suhaila.shifa@incsub.com');
    cy.get('#user_pass').type('1234567891011');
    cy.get('#wp-submit').click();

      // /* ==== Navigate to Smush and Disable Auto Compression ==== */
      // cy.get('#toplevel_page_smush > .wp-has-submenu > .wp-menu-name').click(); //click on Smush from WP dashboard Side panel
      // //cy.get('.sui-modal-skip').click(); //skip modal
      // cy.get('#toplevel_page_smush > .wp-submenu > :nth-child(3) > a').click(); //click on Bulk Smush Sub-Menu
      // cy.get('#column-auto > .sui-form-field > .sui-toggle > .sui-toggle-slider').click();//uncheck auto smush
      // cy.get('#auto').uncheck();
      // cy.get('#auto').scrollIntoView();
      // cy.get('#save-settings-button').click();

    /* ==== Navigates to Media and Uploads 8 Images ==== */
    cy.get('#menu-media > .wp-has-submenu > .wp-menu-name').scrollIntoView();
    cy.get('#menu-media > .wp-has-submenu > .wp-menu-name').click();
    cy.get('.page-title-action').click();//click on Add New button
    // Array of image names
    const images = [
      'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg',
      'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg'
    ];
    cy.get('#plupload-browse-button').attachFile(images.map(image => `images/${image}`));//upload images from fixture folder
    cy.wait(6000); // Wait for all images to upload
  

    /* ==== Start Bulk Smush Images ==== */ 
    cy.get('#toplevel_page_smush > .wp-has-submenu > .wp-menu-name').click();
    cy.get('#toplevel_page_smush > .wp-submenu > :nth-child(3) > a').click();
    cy.get('.wp-smush-bo-start').click();//click on Bulk Smush button
    

    /* ==== Checks Smushed Success Notice ==== */   
    cy.get(':nth-child(2) > .sui-notice-success > .sui-notice-content > .sui-notice-message > p').should('contain', 'All images are smushed');
    
    
    /* ==== Matches Summary Box values of 'Bulk Smush' page with 'Smush Dashboard' page's ==== */
    cy.visit('https://test3suhaila.tempurl.host/wp-admin/admin.php?page=smush-bulk');
    cy.get('#smush-box-summary').then(($summary) => {         
      const imageOptimizedPercent = $summary.find('span > .sui-circle-score-label').text();
      const totalSavingsMB = $summary.find('.sui-summary-large').text();
      const totalSavingsPercent = $summary.find('.wp-smush-savings > .wp-smush-stats-percent').text();      
      const imagesSmushed = $summary.find('.wp-smush-count-total > .sui-summary-detail').text();
      
      cy.visit('https://test3suhaila.tempurl.host/wp-admin/admin.php?page=smush');
      cy.get('#smush-box-summary').should('contain', imageOptimizedPercent);
      cy.get('#smush-box-summary').should('contain', totalSavingsMB);
      cy.get('#smush-box-summary').should('contain', totalSavingsPercent);
      cy.get('#smush-box-summary').should('contain', imagesSmushed);
    });
  });
})