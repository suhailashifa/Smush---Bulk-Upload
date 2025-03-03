
describe('Smush Settings Validation', () => {
  
    it('should check default toggle values for settings form', () => {
      
      /* ==== Login ==== */
      cy.visit('https://test3suhaila.tempurl.host/wp-login.php?');
      cy.get('#user_login').type('suhaila.shifa@incsub.com');
      cy.get('#user_pass').type('1234567891011');
      cy.get('#wp-submit').click();

      // Visit the settings page
      cy.visit('https://test3suhaila.tempurl.host/wp-admin/admin.php?page=smush-bulk');
      
      // Check if the 'Smush Mode' radio buttons are set to the default value ('Basic' - radio button value 0)
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




      cy.log('All default Bulk Smush Settings are validated');
      
  
    });
  });
  