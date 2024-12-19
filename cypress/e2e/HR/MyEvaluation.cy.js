import CommonActions from '../../pages/CommonActions';
import MyEvaluationPage from '../../pages/HR/MyEvaluationPage';

describe('Employee Evaluation Process', () => {
  let testData;

  before(() => {
    cy.fixture('evaluationData').then((data) => {
      testData = data;
    });
  });

  it('Employee completes the self-evaluation', () => {
    // Step 1: Employee Login and Self-Evaluation
    cy.visit(testData.urls.baseUrl);
    CommonActions.login(
      testData.credentials.employee.email,
      testData.credentials.employee.password,
      testData.locators);

    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    cy.url().should('include', 'Employee/EditEvaluation')  //URL Assertion 
    cy.get(testData.employeeName).eq(2).should('include.text','test employee') // Assert Employee Name  is visible
    cy.get(testData.employeeName).eq(3).should('include.text','test supervisor') //Assert Supervisor Name is visible
    MyEvaluationPage.verifyRatingTableColumns(testData.headers); // Verify the headers of the table 

    MyEvaluationPage.fillOutSelfEvaluationNoFeedback() // verify it gives the alerts when no feedback is filled (Cannot submit the evaluation)
    
    MyEvaluationPage.fillOutSelfEvaluationNotAllCheckboxes(testData.comments)
    MyEvaluationPage.verifyMissingQuestions() // verify the that it gives alerts when some checkboxes  are not checked (the alerts show the missing questions)

    

    MyEvaluationPage.verifyCheckboxFunctionality(); //verify the checkbox functionality (only one checkbox can be checked at a time within the same row)
    
    MyEvaluationPage.fillOutSelfEvaluation(testData.comments);
    MyEvaluationPage.saveEvaluation();

    MyEvaluationPage.verifySavedData(testData.comments); //Verify the saved data " filled everything"

    MyEvaluationPage.fillOutSelfEvaluation(testData.emptyComments);
    MyEvaluationPage.verifySavedData(testData.emptyComments); //Verify the saved data "empty comments"

    MyEvaluationPage.fillOutSelfEvaluation(testData.comments);
   MyEvaluationPage.submitEvaluation();

   MyEvaluationPage.verifyEvaluationTableMatchesSelectedRates(); // Verify the evaluation table
                          
    cy.get('img[src="../img/employeeReview.gif"]').should('be.visible');  // Assertion: Self-evaluation is submitted successfully

    // Logout
    CommonActions.logout(testData.locators);

    // Step 2: Supervisor Login and Evaluation
    cy.visit(testData.urls.baseUrl);
    CommonActions.login(
      testData.credentials.supervisor.email,
      testData.credentials.supervisor.password,
      testData.locators);

    cy.contains(testData.locators.myEvaluationNav, 'My Team').click();
    cy.get('table tbody tr')
      .contains('td', testData.evaluationEmployeeName)
      .parent()
      .find(testData.locators.openButton)
      .click();

    MyEvaluationPage.fillOutSelfEvaluation(testData.comments);
    MyEvaluationPage.submitEvaluation();

    // Assertion: Supervisor evaluation is saved successfully
    cy.get('img[src="../img/waitReview.gif"]').should('be.visible');

    cy.contains('button', 'Close Evaluation').click();
    cy.contains('button', 'Submit').click({ force: true });

    // Assertion: Evaluation moved to review stage
    cy.get('img[src="../img/MeetingForReview.gif"]').should('be.visible');

    // Logout
    CommonActions.logout(testData.locators);

    // Step 3: Employee Finalizes the Evaluation
    cy.visit(testData.urls.baseUrl);
    CommonActions.login(
      testData.credentials.employee.email,
      testData.credentials.employee.password,
      testData.locators
    );

    MyEvaluationPage.navigateToMyEvaluation(testData.locators);
    cy.contains('button', 'Close Evaluation').click();
    cy.contains('button', 'Submit').click({ force: true });

    // Assertion: Evaluation is finalized
    cy.get('img[src="../img/close1.gif"]').should('be.visible');

    // Logout
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
    cy.get('table tbody tr')
      .contains('td', testData.statuses.closed)
      .parent()
      .find(testData.locators.changeStatusButton)
      .click();
    cy.get(testData.locators.statusDropdown).select(testData.statuses.started);
    cy.get(testData.locators.showToastButton).click();

  });
});
