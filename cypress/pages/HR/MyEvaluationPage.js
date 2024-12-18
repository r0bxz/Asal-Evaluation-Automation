class MyEvaluationPage {
    navigateToMyEvaluation(locators) {
      cy.contains(locators.myEvaluationNav, "My Evaluation").click();
      
    }
  
    fillOutSelfEvaluation(comments) {
      for (let i = 0; i < 18; i++) {
        const randomNumber = Math.floor(Math.random() * 6)+1; 
        cy.get('table tbody tr')
          .eq(i)
          .within(() => {
            cy.get('td').eq(randomNumber).find('input[type="checkbox"]').check();
          });
      }
  
      for (let a = 0; a < comments.length; a++) {
        cy.get('.form-control').eq(a).clear().type(comments[a]);
      }
    }

    fillOutSelfEvaluationNoFeedback() {
        for (let i = 0; i < 16; i++) {
          const randomNumber = Math.floor(Math.random() * 6)+1; 
          cy.get('table tbody tr')
            .eq(i)
            .within(() => {
              cy.get('td').eq(randomNumber).find('input[type="checkbox"]').check({force:true});
            });
        }
        cy.contains('button', 'Submit Evaluation').click();
       
        cy.on('window:alert', (alertText) => {
            // Verify the alert message
            expect(alertText).to.equal('Please make sure that all highlighted fields are filled');
          });
        
          // Step 4: Confirm the alert (press OK)
          cy.on('window:confirm', () => true);
      }

    fillOutSelfEvaluationNotAllCheckboxes(comments) {
        for (let i = 0; i < 9; i++) {
          const randomNumber = Math.floor(Math.random() * 6)+1; 
          cy.get('table tbody tr')
            .eq(i)
            .within(() => {
              cy.get('td').eq(randomNumber).find('input[type="checkbox"]').check();
            });
        }
    
        for (let a = 0; a < comments.length; a++) {
          cy.get('.form-control').eq(a).clear().type(comments[a]);
        }
        cy.contains('button', 'Submit Evaluation').click();
      }


      verifyMissingQuestions() {
        let uncheckedQuestions = [];
      
        // Step 1: Collect all unchecked questions (rows with all unchecked checkboxes)
        cy.get('table tbody tr').each(($row) => {
          let isUnchecked = true;
      
          cy.wrap($row).find('input[type="checkbox"]').each(($checkbox) => {
            if ($checkbox.is(':checked')) {
              isUnchecked = false; // Mark the row as having a checked checkbox
            }
          }).then(() => {
            if (isUnchecked) {
              cy.wrap($row).find('td').eq(0).find('b').invoke('text').then((questionText) => {
                uncheckedQuestions.push(questionText.trim());
              });
            }
          });
        }).then(() => {
          // Step 2: Perform assertions after the uncheckedQuestions array is fully populated
          cy.get('.bootbox-body').within(() => {
            uncheckedQuestions.forEach((question, index) => {
              cy.get('b').eq(index).should('include.text', question);
            });
          });
      
          cy.log('Unchecked Questions:', uncheckedQuestions);
        });
      
        // Step 3: Click the cancel button
        cy.contains('button', 'Cancel').click({ force: true });
      }
      
      
      

    verifyCheckboxFunctionality() {
    // Get all rows in the table
    cy.get('table tbody tr').then(($rows) => {
        const rowIndices = [0, 8, $rows.length - 1]; // Indices: 0 (1st row), 8 (9th row), and last row

        // Loop through the selected rows (1st, 9th, and last row)
        rowIndices.forEach((rowIndex) => {
            // Get all checkboxes within the current row
            cy.wrap($rows.eq(rowIndex)).find('input[type="checkbox"]').then(($checkboxes) => {
                // Loop through each checkbox in the row
                for (let checkboxIndex = 0; checkboxIndex < $checkboxes.length; checkboxIndex++) {
                    // Check the current checkbox
                    cy.wrap($checkboxes.eq(checkboxIndex)).check({ force: true });

                    // Verify the current checkbox is checked
                    cy.wrap($checkboxes.eq(checkboxIndex)).should('be.checked');

                    // Verify all other checkboxes in the same row are not checked
                    for (let innerIndex = 0; innerIndex < $checkboxes.length; innerIndex++) {
                        if (innerIndex !== checkboxIndex) {
                            cy.wrap($checkboxes.eq(innerIndex)).should('not.be.checked');
                        }
                    }
                }
            });
        });
    });
}

saveEvaluation() {
    cy.contains('button', 'Save Evaluation').click();
  }
    submitEvaluation() {
      cy.contains('button', 'Submit Evaluation').click();
      cy.contains('button', 'Confirm').click({ force: true });
    }

    verifyRatingTableColumns(expectedHeaders) {
        // Target the table headers within <thead> and verify each column
        cy.get('table thead').eq(1).within(() => {
            expectedHeaders.forEach((header, index) => {
                cy.get('th').eq(index).should('include.text', header);
            });
        });
    }

    verifyCheckboxFunctionality() {
        // Get all rows in the table
        cy.get('table tbody tr').then(($rows) => {
            const rowIndices = [0, 8, $rows.length - 1]; // Indices: 0 (1st row), 8 (9th row), and last row
    
            // Loop through the selected rows (1st, 9th, and last row)
            rowIndices.forEach((rowIndex) => {
                // Get all checkboxes within the current row
                cy.wrap($rows.eq(rowIndex)).find('input[type="checkbox"]').then(($checkboxes) => {
                    // Loop through each checkbox in the row
                    for (let checkboxIndex = 0; checkboxIndex < $checkboxes.length; checkboxIndex++) {
                        // Check the current checkbox
                        cy.wrap($checkboxes.eq(checkboxIndex)).check({ force: true });
    
                        // Verify the current checkbox is checked
                        cy.wrap($checkboxes.eq(checkboxIndex)).should('be.checked');
    
                        // Verify all other checkboxes in the same row are not checked
                        for (let innerIndex = 0; innerIndex < $checkboxes.length; innerIndex++) {
                            if (innerIndex !== checkboxIndex) {
                                cy.wrap($checkboxes.eq(innerIndex)).should('not.be.checked');
                            }
                        }
                    }
                });
            });
        });
    }
    verifySavedData(comments) {
        // Verify checkboxes are still checked
        cy.get('table tbody tr').each(($row) => {
          cy.wrap($row).find('input[type="checkbox"]').should('be.checked');
        });
    
        // Verify feedback notes are still filled
        for (let i = 0; i < comments.length; i++) {
          cy.get('.form-control').eq(i).should('have.value', comments[i]);
        }
      }
    
    
    
  }
  
  export default new MyEvaluationPage();
  