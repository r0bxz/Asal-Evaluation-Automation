class HrHomePage {

    getRatingsTable() {
      return cy.get('#instructions-data-table'); 
    }
  
    getTableRows() {
      return this.getRatingsTable().find('tr'); 
    }
  
    verifyRatingTable(data) {
        for (let i = 0; i < 6; i++) {
        cy.get('table tbody tr').eq(i).within(()=>{
            cy.log(data[i].category);
            cy.get('td').eq(0).should('include.text', data[i].category);
            const firstLine = data[i].description.split('\n')[0];
            cy.get('td').eq(1).should('include.text', firstLine);
        })
              
        }
    }
  }
  
  export default new HrHomePage();
  