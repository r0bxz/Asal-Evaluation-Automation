import CommonActions from '../../pages/CommonActions';
import EvaluationHistoryPage from '../../pages/EvaluationHistoryPage';  
import testData from'../../fixtures/evaluationData.json'

describe('Evaluation History', () => {

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

  it('verifies the page loads and displays evaluation cycles', () => {
    cy.visit(testData.urls.baseUrl);
    EvaluationHistoryPage.navigateToEvaluationHistory(testData.locators);
    cy.url().should('include', 'Employee/EvaluationHistory');
    cy.get('table tbody tr').should('have.length.greaterThan', 0); // Assert there are rows in the table
  });

  it('verifies "No Evaluation" message for cycles with no evaluation', () => {
    cy.visit(testData.urls.baseUrl);
    EvaluationHistoryPage.navigateToEvaluationHistory(testData.locators);
    it('verifies "No Evaluation" message for cycles with no evaluation', () => {
      cy.visit(testData.urls.baseUrl);
      EvaluationHistoryPage.navigateToEvaluationHistory(testData.locators);
      EvaluationHistoryPage.checkNoEvaluation();
      
    });
    
  });

  it('checks if the next td contains a button when status is not "No Evaluation"', () => {
    cy.visit(testData.urls.baseUrl);
    EvaluationHistoryPage.navigateToEvaluationHistory(testData.locators);
    
    cy.get('table#historyTable tbody tr').each(($row) => {
      // Get the second <td> (status column) in the current row
      const status = $row.find('td').eq(1).text().trim(); // Status column is the second td

      // If the status is not "No Evaluation", check for a button in the next <td>
      if (status !== 'No Evaluation') {
        // Check that the next <td> contains a button with the class btn-group
        cy.wrap($row)
          .find('td').eq(2) // Get the third <td> (next td after status)
          .find('.btn-group') // Check for button with class btn-group
          .should('exist'); // Assert the button exists
      }
    });
  });

  it('verifies search functionality', () => {
    cy.visit(testData.urls.baseUrl);
    EvaluationHistoryPage.navigateToEvaluationHistory(testData.locators);
    cy.get(testData.locators.search).type(testData.evaluationDate); // Test with a valid evaluation cycle
    cy.get(testData.locators.table).first().contains(testData.evaluationDate);
  });

  it('verifies evaluation status is displayed correctly', () => {
    cy.visit(testData.urls.baseUrl);
    EvaluationHistoryPage.navigateToEvaluationHistory(testData.locators);
    EvaluationHistoryPage.evaluationStatus();
   
  });

  it('verifies no evaluation cycles are hidden in pagination', () => {
    cy.visit(testData.urls.baseUrl);
    EvaluationHistoryPage.navigateToEvaluationHistory(testData.locators);
    cy.contains('Showing 1 to 21 of 21 entries').should('be.visible');
  });

  it('verify the hide button functionality', () => {
      cy.visit(testData.urls.baseUrl);
      EvaluationHistoryPage.navigateToEvaluationHistory(testData.locators);
      EvaluationHistoryPage.verifyButton();
  });



});

