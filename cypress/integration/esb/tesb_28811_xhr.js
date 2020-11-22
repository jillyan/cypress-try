import login from "./data/loginUser.json";
import loginByXhr from "loginByXhr";

context("tesb_28811 login with xhr", function () {
  beforeEach(function () {
    // Cypress.Cookies.preserveOnce("SESSION", "XSRF-TOKEN");
  });
  before(function () {
      loginByXhr();
    });

    cy.on("uncaught:exception", (err, runnable) => {
      // TODO, doubt within is used correctly.
      expect(err.message).to.within([
        "e.store.dispatch is not a function",
        "Can only call open() on same-origin documents",
      ]);
      // return false to prevent the error from failing this test
      return false;
    });

    cy.visit("");
    cy.waitUntil(() => cy.get("#tc-layout-side-menu").should("exist"));
    cy.get("#tmc-menu-nav-management-btn", { timeout: 5000 }).click();
    cy.get("button[label='jill-env']").click();
    cy.get("svg[name='talend-flow']").parent().click();
  });

  it("tesb_28811", function () {
    cy.get("button[title='tesb_28811']").click();
    cy.get("button[id='esb-task-details-edit']").click();
    cy.get("button[aria-label='Continue']").click(); //TODO add id in TMC
    cy.get("#runtime").click();

    cy.get("#react-autowhatever-runtime").contains("li", "re0").click();
    cy.get("#bsStyle").click();
    cy.waitUntil(() => cy.get("#esb-task-details-deploy").should("exist"));
    cy.get("#esb-task-details-deploy").should("not.have.attr", "disabled");

    // set language French. begin
    cy.get("#tmc-user-settings").click({ force: true });
    cy.get("ul[aria-labelledby='tmc-user-settings']")
      .children()
      .each(($li, index) => {
        if (index == 4) {
          cy.wrap($li).find("a").click({ force: true });
        }
      });
    cy.get("svg[name='talend-network']").parent().click();
    cy.get("input[id='preferredLanguage']").type("Français");
    cy.get("button[id='tp-lang-region-submit']").click();
    // set language French end
    cy.get("button[id='backArrow']").click();
    cy.waitUntil(() => cy.get("#esb-task-details-deploy").should("exist"));

    cy.get("#esb-task-details-deploy").should("not.have.attr", "disabled");

    // set language Japanese begin  (日本語)
    cy.get("button[id='tmc-user-settings").click({ force: true });
    cy.get("ul[aria-labelledby='tmc-user-settings']")
      .children()
      .each(($li, index) => {
        if (index == 4) {
          cy.wrap($li).find("a").click({ force: true });
        }
      });
    cy.get("svg[name='talend-network']").parent().click();
    cy.get("input[id='preferredLanguage']").type("日本語");
    cy.get("button[id='tp-lang-region-submit']").click();
    // set language Japanese end
    cy.get("button[id='backArrow']").click();
    cy.waitUntil(() => cy.get("#esb-task-details-deploy").should("exist"));

    cy.get("#esb-task-details-deploy").should("not.have.attr", "disabled");

    // set language English begin
    cy.get("button[id='tmc-user-settings").click({ force: true });
    cy.get("ul[aria-labelledby='tmc-user-settings']")
      .children()
      .each(($li, index) => {
        if (index == 4) {
          cy.wrap($li).find("a").click({ force: true });
        }
      });
    cy.get("svg[name='talend-network']").parent().click();
    cy.get("input[id='preferredLanguage']").type("English");
    cy.get("button[id='tp-lang-region-submit']").click();
    cy.get("button[id='backArrow']").click();
    // set language end

    //back to task list
    cy.get("#backArrow").click();
  });

  it("test Route creation, need publish DemoRESTRoute with same name to this workspace in advance", () => {
      // delete route "Route4TestCreation"

      //id: tasks:toolbar:add
      cy.get("button[id=tasks:toolbar:add']").click();
      //id: tasks:add:task
      cy.get("button[id=tasks:add:task']").click();

      // need wait until get form class:tmc-wizard-form
      //select "Artifact type*" as "Route"
      //select "Artifact": "DemoRESTRoute"

  });
});
