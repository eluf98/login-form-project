describe('giriş formu testleri ', () => {
  it('eğer form düzgün doldurulursa buton aktif hale gelmeli', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('StrongPass123')
    cy.get('input[type="checkbox"]').check()

    cy.get('button[type="submit"]').should('not.be.disabled')
  })
})