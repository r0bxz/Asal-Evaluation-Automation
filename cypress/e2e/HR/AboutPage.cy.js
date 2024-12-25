import CommonActions from '../../pages/CommonActions';
import AboutPage from '../../pages/AboutPage';
import testData from '../../fixtures/evaluationData.json';

describe('About Page', () => {

  beforeEach(() => {
    cy.session('employee-session', () => {
      cy.visit(testData.urls.baseUrl);
      CommonActions.login(
        testData.credentials.employee.email,
        testData.credentials.employee.password,
        testData.locators
      );
    });
  });

  after(() => {
    CommonActions.logout(testData.locators);
  });

  it('verifies the About page loads successfully', () => {
    cy.visit(testData.urls.baseUrl);
    AboutPage.navigateToAboutPage(testData.locators);
    cy.url().should('include', 'About'); // Verify the page URL
    cy.contains('SPECIAL THANKS').should('be.visible'); // Ensure the title is displayed
  });

  it('verifies the names under Current Staff are displayed correctly', () => {
    cy.visit(testData.urls.baseUrl);
    AboutPage.navigateToAboutPage(testData.locators);
    AboutPage.verifyCurrentStaff(testData.currentStaff);
  });

  it('verifies the names under Old Staff are displayed correctly', () => {
    cy.visit(testData.urls.baseUrl);
    AboutPage.navigateToAboutPage(testData.locators);
    AboutPage.verifyOldStaff(testData.oldStaff);
  });

});
