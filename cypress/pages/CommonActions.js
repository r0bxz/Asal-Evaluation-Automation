class CommonActions {
    login(email, password, locators) {
      cy.get(locators.emailField).type(email);
      cy.get(locators.passwordField).type(password);
      cy.get(locators.loginButton).click();
    }
  
    logout(locators) {
      cy.get(locators.dropdownToggle).eq(0).trigger('mouseover');
      cy.get(locators.logoutButton).click();
    }
  }
  
  export default new CommonActions();
  