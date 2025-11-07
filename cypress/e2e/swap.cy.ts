describe('Swap Flow', () => {
  it('should load the swap page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('DeFi Token Swapper');
  });
});
