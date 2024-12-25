import CommonActions from '../../pages/CommonActions';
import ProbationEvaluationsPage from '../../pages/ProbationEvaluationsPage';
import testData from '../../fixtures/evaluationData.json';


describe('Probation Evaluations', () => {

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

  it('verifies the page loads and displays probation evaluations', () => {
    cy.visit(testData.urls.baseUrl);
    ProbationEvaluationsPage.navigateToProbationEvaluations(testData.locators);
    cy.url().should('include', '/Probation');
    cy.get('table tbody tr').should('have.length.greaterThan', 0); // Assert there are rows in the table
  });

  it('verifies search functionality', () => {
    cy.visit(testData.urls.baseUrl);
    ProbationEvaluationsPage.navigateToProbationEvaluations(testData.locators);
    ProbationEvaluationsPage.searchProbationEvaluations(testData.searchQuery);
    cy.get(testData.locators.table).first().contains(testData.searchQuery);
  });

  it('verifies status filtering works correctly', () => {
    cy.visit(testData.urls.baseUrl);
    ProbationEvaluationsPage.navigateToProbationEvaluations(testData.locators);
    ProbationEvaluationsPage.filterByStatus('Closed');
    ProbationEvaluationsPage.verifyAllRowsHaveStatus('Closed');
  });

  it('verifies the action buttons exist', () => {
    cy.visit(testData.urls.baseUrl);
    ProbationEvaluationsPage.navigateToProbationEvaluations(testData.locators);
    ProbationEvaluationsPage.verifyActionButtonsExist();
  });

  it('verifies pagination functionality', () => {
    cy.visit(testData.urls.baseUrl);
    ProbationEvaluationsPage.navigateToProbationEvaluations(testData.locators);
    ProbationEvaluationsPage.verifyPagination();
  });

});
