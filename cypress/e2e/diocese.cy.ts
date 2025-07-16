describe("DiocesesPage", () => {
  beforeEach(() => {
    cy.login();
  });

  describe("Carregamento inicial", () => {
    it("deve exibir o skeleton loading inicialmente", () => {
      // Intercepta a API para simular delay
      cy.intercept("GET", "/api/ambrosio/diocese", {
        delay: 1000,
        statusCode: 200,
        body: { data: [] },
      }).as("getDioceses");

      cy.visit("/dashboard/dioceses");

      // Verifica se o skeleton loading está visível
      cy.get('[data-cy="skeleton-loading"]')
        .should("be.visible")
        .should("contain.text", "Carregando dioceses ...");
    });

    it("deve exibir o título com contador zerado durante carregamento", () => {
      cy.intercept("GET", "/api/ambrosio/diocese", {
        delay: 1000,
        body: { data: [] },
      }).as("getDioceses");

      cy.visit("/dashboard/dioceses");

      // Verifica se o título aparece com contador 0
      cy.get('[data-cy="page-subtitle-title"]').should(
        "contain.text",
        "Dioceses - 0"
      );

      cy.get('[data-cy="page-subtitle-subtitle"]').should(
        "contain.text",
        "do Brasil"
      );
    });
  });
});
