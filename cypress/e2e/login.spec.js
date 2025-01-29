describe('Login Form', () => {
    it('başarılı form doldurulduğunda success sayfasını gösteriyor', () => {
      cy.visit('http://localhost:5173');
      cy.get('input[type="email"]').type('test@test.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('input[type="checkbox"]').check();
      cy.get('button').click();
      cy.contains('Giriş Başarılı!').should('be.visible');
    });
  
    it('geçersiz email girişi olduğunda hata mesajı gösteriyor', () => {
      cy.visit('http://localhost:5173');
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('button').should('be.disabled');
      cy.contains('Geçerli bir email adresi giriniz').should('be.visible');
    });
  
    it('email ve şifre yanlış olduğunda 2 hata mesajı gösteriyor', () => {
      cy.visit('http://localhost:5173');
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button').should('be.disabled');
      cy.contains('Geçerli bir email adresi giriniz').should('be.visible');
      cy.contains('Şifre en az 8 karakter, bir harf ve bir rakam içermelidir').should('be.visible');
    });
  
    it('şartları kabul etmedikçe buton disabled kalıyor', () => {
      cy.visit('http://localhost:5173');
      cy.get('button').should('be.disabled');
    });
  });