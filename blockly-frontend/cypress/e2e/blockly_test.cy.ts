describe('Blockly Frontend Test', () => {

  beforeEach(() => {
    cy.visit('http:localhost:4200');
  })

  it('should contain Blockly workspace', () => {
    cy.get('#blocklyDiv').should('exist'); // Check that the div exists
  });
  it('should open save form', () => {
    cy.get('#showSaveForm').click(); // Check that the div exists
    cy.get('#inputTitle').type("asdas")
  });

  it('should complete the form', () =>{
    
  })
});
