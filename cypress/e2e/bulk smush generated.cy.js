describe('template spec', () => {
  it('passes', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://test3suhaila.tempurl.host/wp-login.php?');
    cy.get('#user_login').clear();
    cy.get('#user_login').type('suhaila.shifa@incsub.com');
    cy.get('#user_pass').clear('234567891011');
    cy.get('#user_pass').type('234567891011');
    cy.get('#loginform').click();
    cy.get('#wp-submit').click();
    cy.get('#user_pass').clear('1');
    cy.get('#user_pass').type('1234567891011');
    cy.get('#wp-submit').click();
    cy.get('#toplevel_page_smush > .wp-submenu > :nth-child(3) > a').click();
    cy.get('#lossy-level__basic').click();
    cy.get('[data-tabs=""] > .active').click();
    cy.get('#all-image-sizes').check();
    cy.get('#auto-label').click();
    cy.get('#auto').uncheck();
    cy.get('#auto-label').click();
    cy.get('#auto').check();
    cy.get('#column-strip_exif > .sui-form-field > .sui-toggle > .sui-toggle-slider').click();
    cy.get('#strip_exif').uncheck();
    cy.get('#column-strip_exif > .sui-form-field > .sui-toggle > .sui-toggle-slider').click();
    cy.get('#strip_exif').check();
    cy.get('#column-resize > :nth-child(1) > .sui-toggle > .sui-toggle-slider').click();
    cy.get('#resize').check();
    cy.get('#column-resize > :nth-child(1) > .sui-toggle > .sui-toggle-slider').click();
    cy.get('#resize').uncheck();
    cy.get('#column-resize > :nth-child(2) > .sui-toggle > .sui-toggle-slider').click();
    cy.get('#no_scale').check();
    cy.get('#column-resize > :nth-child(2) > .sui-toggle > .sui-toggle-slider').click();
    cy.get('#no_scale').uncheck();
    cy.get('#original-label').click();
    cy.get('#original').check();
    cy.get('#original-label').click();
    cy.get('#original').uncheck();
    cy.get('#backup-label').click();
    cy.get('#backup').check();
    cy.get('#backup-label').click();
    cy.get('#backup').uncheck();
    cy.get('#png_to_jpg-label').click();
    cy.get('#png_to_jpg').check();
    cy.get('#png_to_jpg-label').click();
    cy.get('#png_to_jpg').uncheck();
    cy.get('#column-background_email > .sui-form-field').click();
    cy.get('#background_email-label').click();
    cy.get('#background_email').check();
    cy.get('#background_email-label').click();
    cy.get('#background_email-label').click();
    cy.get('#background_email').uncheck();
    cy.get('.sui-box-settings-col-2 > .sui-description').click();
    cy.get('#bulk-restore-settings-row > .sui-box-settings-col-2').click();
    /* ==== End Cypress Studio ==== */
  })
})