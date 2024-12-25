import testData from '../fixtures/evaluationData.json';

class ProbationEvaluationsPage {

  navigateToProbationEvaluations(locators) {
    cy.contains(locators.probationEvaluationsNav, "Probation Evaluation").click();
  }

  searchProbationEvaluations(query) {
    cy.get(testData.locators.search).type(query);
    cy.get(testData.locators.table).should('contain.text', query); // Assert the query appears in the table
  }

  filterByStatus(status) {
    cy.get(testData.locators.evaluationStatus).select(status); // Select status from dropdown
    cy.contains(testData.locators.loginButton,"Apply Filters").click()
    cy.get(testData.locators.table).each(($row) => {
      cy.wrap($row).find('td').eq(4).should('contain.text', status); // Ensure Status column matches the selected status
    });
  }

  verifyAllRowsHaveStatus(status) {
    cy.get(testData.locators.table).each(($row) => {
      cy.wrap($row).find('td').eq(4).should('contain.text', status);
    });
  }

  verifyActionButtonsExist() {
    cy.get(testData.locators.table).each(($row) => {
      cy.wrap($row).find('td').last().find('button').should('exist'); // Ensure action buttons exist in the last column
    });
  }

  verifyPagination() {
    cy.contains('Showing').should('be.visible'); // Ensure pagination info is displayed
    
  }

}

export default new ProbationEvaluationsPage();
