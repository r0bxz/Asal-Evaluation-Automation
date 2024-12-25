import testData from '../fixtures/evaluationData.json'
class EvaluationHistoryPage {

    navigateToEvaluationHistory(locators) {
      cy.contains(locators.evaluationHistoryNav, "Evaluation History").click();
    }
  
    verifyEvaluationCyclesDisplayed() {
      cy.get(testData.locators.table).each(($row) => {
        cy.wrap($row).find('td').eq(0).should('not.be.empty'); // Ensure Evaluation Cycle is displayed
      });
    }
  
    verifyEvaluationStatusDisplayed() {
      cy.get(testData.locators.table).each(($row) => {
        cy.wrap($row).find('td').eq(1).should('not.be.empty'); // Ensure Evaluation Status is displayed
      });
    }
  
    searchEvaluationHistory(query) {
      cy.get(testData.locators.search).type(query);
      cy.get(testData.locators.table).should('have.length', 1); // Should return one result after search
    }
  
    verifyNoEvaluationMessage() {
      cy.get(testData.locators.table).each(($row) => {
        cy.wrap($row).find('td').eq(2).should('contain.text', 'there is no evaluation for this cycle');
      });
    }

    checkNoEvaluation(){
        cy.get(testData.locators.table).each(($row) => {
            // Check if the first <td> contains "No Evaluation"
            cy.wrap($row).find('td').eq(0).contains('No Evaluation').then(($td) => {
              cy.wrap($td).next().should('include.text', 'there is no evaluation for this cycle');
            });
          });
    }

    evaluationStatus(){
        cy.get(testData.locators.table).each(($row) => {
            cy.wrap($row).find('td').eq(1).should('not.be.empty'); // Assert evaluation status is not empty
          });
    }

    verifyButton(){
        cy.get(testData.locators.collapseButton).eq(1).click()
    cy.get(testData.locators.tableBody)
      .should('have.css', 'display', 'none'); // Ensure the table is hidden

      cy.get('.expand')
      .click();

      cy.get(testData.locators.tableBody)
      .should('have.css', 'display', 'block'); // Ensure the table is shown
    }

    buttonExist(){
      cy.get(testData.locators.table).each(($row) => {
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
    }
  }
  
  export default new EvaluationHistoryPage();
  