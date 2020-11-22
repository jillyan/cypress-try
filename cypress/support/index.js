// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// beforeEach(function () {
//     cy.log('The current Env is ${JSON.stringify(Cypress.env())}')
// })
//import 'cypress-xpath'
import 'cypress-commands';
import 'node-fetch';

// Cypress.Cookies.defaults({
//     preserve: ["x-xsrf-token"]
// });

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});
beforeEach(function () {
    cy.log(`当前环境变量为${JSON.stringify(Cypress.env())}`)
    cy.log(`当前配置项信息为${JSON.stringify(Cypress.config())}`)
});