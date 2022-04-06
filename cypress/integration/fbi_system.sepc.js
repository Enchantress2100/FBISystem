describe("FBI System", () => {
  it("frontepage can be opened", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Ingrese sus credenciales");
  });
    it("Click test Ingresar", () => {
      cy.visit("http://localhost:3000");
      cy.contains("Ingresar").click();
    });
    it("Click test Input", () => {
      cy.visit("http://localhost:3000");
      cy.get("input:first").type("mi_nombre");
    });
});
//considerar describe, it, y los metodos visit y contains, ya que especifica lo que hay que hacer en el test