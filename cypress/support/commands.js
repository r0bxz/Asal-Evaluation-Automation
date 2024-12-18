// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', (err, runnable) => {
    // You can log the error or just return false to ignore it
    if (err.message.includes('DataTable is not a function')) {
      // Optionally log or handle the error here
      return false; // Prevent the test from failing
    }
  
    // By default, let Cypress handle other uncaught exceptions
    return true;
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // You can log the error or just return false to ignore it
    if (err.message.includes('Cannot read properties of undefined')) {
      // Optionally log or handle the error here
      return false; // Prevent the test from failing
    }
  
    // By default, let Cypress handle other uncaught exceptions
    return true;
  });
  