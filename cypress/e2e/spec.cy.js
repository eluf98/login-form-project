beforeEach(() => {
  cy.visit("/")
})

describe('login with valid data', () => {
  it('submits', () => {
    cy.get('[data-testid="email-input"]').type("example@email.com")
    cy.get('[data-testid="password-input"]').type("examplepassword")
    cy.get('[data-testid="terms-checkbox"]').click()
    cy.get('[data-testid="submit-button"]').should('not.be.disabled')
  })

  it('redirects to success page', () => {
    cy.get('[data-testid="email-input"]').type("example@email.com")
    cy.get('[data-testid="password-input"]').type("examplepassword")
    cy.get('[data-testid="terms-checkbox"]').click()
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="success-text"]').should('be.visible')
})
})

describe('login with invalid data', () => {
  it('shows error message with invalid email', () => {
    cy.get('[data-testid="email-input"]').type("example")
    cy.get('[data-testid="email-error"]').should("be.visible")
    cy.get('[data-testid="submit-button"]').should('be.disabled')
  })

  it('shows error message with invalid email and invalid password', () => {
    cy.get('[data-testid="email-input"]').type("example")
    cy.get('[data-testid="email-error"]').should("be.visible")
    cy.get('[data-testid="password-input"]').type("e")
    cy.get('[data-testid="password-error"]').should("be.visible")
  })

  it('prevents submitting with unchecked terms', () => {
    cy.get('[data-testid="email-input"]').type("example")
    cy.get('[data-testid="email-error"]').should("be.visible")
    cy.get('[data-testid="password-input"]').type("e")
    cy.get('[data-testid="password-error"]').should("be.visible")
    cy.get('[data-testid="submit-button"]').should('be.disabled')
  })
})