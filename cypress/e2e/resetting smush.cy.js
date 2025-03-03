describe('template spec', () => {
  it('passes', () => {
    
    cy.visit('https://test3suhaila.tempurl.host/wp-login.php?');
    cy.get('#user_login').clear();
    cy.get('#user_login').type('suhaila.shifa@incsub.com');
    cy.get('#user_pass').clear('1');
    cy.get('#user_pass').type('1234567891011');
    cy.get('#wp-submit').click();

    cy.visit('https://test3suhaila.tempurl.host/wp-admin/admin.php?page=smush-settings&view=data');
    cy.get('[for="keep_data-false"]').click();
    cy.get('#keep_data-false').check();
    cy.get('#data-uninstallation-settings-row > .sui-box-settings-col-2 > .sui-button').click();
    cy.get('#reset-settings-dialog > .sui-box > .sui-box-body').click();
    cy.get('#reset-setting-confirm').click();
    cy.log('Reset done');
    
  })
})