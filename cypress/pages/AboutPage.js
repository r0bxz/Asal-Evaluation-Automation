import testData from '../fixtures/evaluationData.json';

class AboutPage {

  navigateToAboutPage(locators) {
    cy.contains(locators.myEvaluationNav, "About").click();
  }

  verifyCurrentStaff(staffList) {
    staffList.forEach((name) => {
      cy.contains('Current Staff').parent().should('contain.text', name); // Check each name in the Current Staff section
    });
  }

  verifyOldStaff(staffList) {
    staffList.forEach((name) => {
      cy.contains('Old Staff').parent().should('contain.text', name); // Check each name in the Old Staff section
    });
  }

}

export default new AboutPage();
