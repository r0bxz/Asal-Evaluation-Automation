import CommonActions from '../../pages/CommonActions';
import MyEvaluationPage from '../../pages/MyEvaluationPage';
import testData from '../../fixtures/evaluationData.json';  // Importing the testData directly

describe('Employee Evaluation Process', () => {

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

    // Step 4: HR Updates Evaluation Status
    cy.visit(testData.urls.baseUrl);
    CommonActions.login(
      testData.credentials.hr.email,
      testData.credentials.hr.password,
      testData.locators
    );

    cy.contains(testData.locators.myEvaluationNav, "Manage Evaluations").click();
    cy.get(testData.locators.nameDropdown).select(testData.selectEmployeeName);
    cy.get(testData.locators.table).eq(0).parent().find(testData.locators.changeStatusButton).click();
    cy.get(testData.locators.statusDropdown).select(testData.statuses.started);
    cy.get(testData.locators.showToastButton).click();
    CommonActions.logout(testData.locators);
    CommonActions.login( testData.credentials.employee.email, testData.credentials.employee.password, testData.locators);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    cy.get(testData.locators.checkbox).uncheck({ force: true });

    for (let a = 0; a < testData.comments.length; a++) {
      cy.get(testData.locators.textarea).eq(a).clear()
    }

    MyEvaluationPage.saveEvaluation();
    cy.clearAllSessionStorage()
  });

  it('verifies employee name is visible', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    cy.url().should('include', 'Employee/EditEvaluation');
    cy.get(testData.employeeName).eq(2).should('include.text', 'test employee'); // Assert Employee Name is visible
  });

  it('verifies supervisor name is visible', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    cy.url().should('include', 'Employee/EditEvaluation');
    cy.get(testData.employeeName).eq(3).should('include.text', 'test supervisor'); // Assert Supervisor Name is visible
  });

  it('verifies the headers in the evaluation table', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    cy.url().should('include', 'Employee/EditEvaluation');
    MyEvaluationPage.verifyRatingTableColumns(testData.headers); // Verify the headers of the table
  });

  it('verifies alerts when no feedback is filled', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    MyEvaluationPage.fillOutSelfEvaluationNoFeedback(); 
  });
   

  it('verifies alerts when not all checkboxes are checked', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    MyEvaluationPage.fillOutSelfEvaluationNotAllCheckboxes(testData.comments);
    MyEvaluationPage.verifyMissingQuestions(); // Verify that it gives alerts when some checkboxes are not checked (the alerts show the missing questions)
  });

  it('verifies checkbox functionality (only one checkbox can be checked at a time within the same row)', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    MyEvaluationPage.verifyCheckboxFunctionality(); // Verify checkbox functionality
  });

  it('verifies saved data after filling out self-evaluation', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    MyEvaluationPage.fillOutSelfEvaluation(testData.comments); // Fill out the self-evaluation with the provided comments
    MyEvaluationPage.saveEvaluation();
    MyEvaluationPage.verifySavedData(testData.comments); // Verify the saved data
  });

  it('fills out self-evaluation with empty comments and verifies saved data', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    MyEvaluationPage.fillOutSelfEvaluation(testData.emptyComments); // Fill out with empty comments
    MyEvaluationPage.verifySavedData(testData.emptyComments); // Verify saved data with empty comments
  });

  it('submits the self-evaluation and verifies successful submission', () => {
    cy.visit(testData.urls.baseUrl);
    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    MyEvaluationPage.fillOutSelfEvaluation(testData.comments);
    MyEvaluationPage.submitEvaluation();

    MyEvaluationPage.verifyEvaluationTableMatchesSelectedRates(); // Verify the evaluation table matches the selected rates
    cy.get('img[src="../img/employeeReview.gif"]').should('be.visible'); // Assertion: Self-evaluation is submitted successfully
  });
});
