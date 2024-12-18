import HrHomePage from '../../pages/HR/HomePage';
import ratings from '../../fixtures/HrPage.json'


describe('HR Home Page', () => {
   


  it('TC1: Should display the correct rating instructions', () => {
    cy.visit('http://172.22.1.141:8089/'); 
    cy.get('#email').type('test-employee'); 
    cy.get('#password').type('45622'); 
    cy.get('button[type="submit"]').click();
      HrHomePage.verifyRatingTable(ratings);

  });
});
