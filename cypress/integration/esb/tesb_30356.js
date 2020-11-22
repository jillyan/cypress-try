import login from "./data/loginUser.json";

context("tesb_30356", function () {
  beforeEach(function () {
    Cypress.Cookies.preserveOnce("SESSION", "XSRF-TOKEN");
  });
  before(function () {
    cy.visit("");

    cy.get("button[id='cookie-disclaimer-button']").should(($btn) => {
      if ($btn) {
        $btn.click();
      }
    });
    cy.get("input[id=username]").type(login.username);
    cy.get("input[id=password]").type(login.password);
    cy.get("#login-submit-button").click();
    cy.waitUntil(() => cy.get('#tc-layout-side-menu').should('exist'));
    // access task list in jill-env
    cy.get("#tmc-menu-nav-management-btn", { timeout: 50000 }).click();
    cy.get("button[label='jill-env']").click();
    cy.get("svg[name='talend-flow']").parent().click();
  });
  it("tesb_30356", function () {
    cy.get("button[title='tesb_30356']").click();
    //use rec
    // cy.get("button[id='esb-task-details-edit']").click();
    // cy.get("button[aria-label='Continue']").click(); //TODO add id in TMC
    // cy.get("#runtime").click();
    //
    // cy.get("#react-autowhatever-runtime").contains("li", "REC").click();
    // cy.get("#bsStyle").click();
    cy.wait(15000);

    //deploy
    //   cy.get("#esb-task-details-deploy").click();
    //get task id contains("Task ID")
    // cy.get("div")
    //   .find("small.tc-subheader-details-text-subtitle")
    //   .then(($idEle) => {
    //     let value = $idEle.text();
    //     let id = value.substr(9, value.length - 1);
    //     cy.log(id);
    //     //expand the deployment panel
    //     cy.get("#" + id + "--heading").click();
    //   });
    cy.get(".panel-title").click();
    cy.get(".esb-deployment-right-metric").then(($arr) => {
      $arr.forEach((item) => {
        let label = item.firstChild.textContent();
        let value = item.lastChild.text();
        cy.log(label + ":" + value);
      });
    });
    //check if is running status
    //panel id is ${task_id}--heading
    //wait for 1 min

    //check if sending get metric request
    //check metric data in ui
  });
});
