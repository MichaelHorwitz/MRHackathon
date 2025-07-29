describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should add a JWT token to cookies", () => {
    cy.get("input[name=email]").type("example@email.com");
    cy.get("input[name=password]").type("password123");
    cy.get("button");
    cy.get("button").contains("Login").click();
    cy.getCookie("jwt").should("exist");
  });
});
