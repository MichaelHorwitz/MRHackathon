describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("should redirect to login when signed up", () => {
    cy.get("input[name=name]").type("John");
    cy.get("input[name=email]").type("johnsmith@example.com");
    cy.get("input[name=password]").type("password123");
    cy.get("input[name=confirmPassword]").type("password123");
    cy.get("button");
    cy.get("button").contains("Create Account").click();
    cy.location().should("eq", "/login");
  });
});
