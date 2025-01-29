describe('Login Form Validation', () => {
    it('should submit the form successfully and navigate to success page', () => {
      cy.visit('/'); // App'in ana sayfasına git
      cy.get('input[type="email"]').type('test@example.com'); // Geçerli email
      cy.get('input[type="password"]').type('StrongPassword123'); // Geçerli şifre
      cy.get('input[type="checkbox"]').check(); // Şartları kabul et
      cy.get('button[type="submit"]').click(); // Submit butonuna tıkla
      
      cy.url().should('include', '/succes'); // Success sayfasına yönlendirildiğini kontrol et
      cy.contains('Giriş Başarılı!'); // Başarılı mesajını kontrol et
    });
  
    it('should show an error message when email is invalid', () => {
      cy.visit('/'); // App'in ana sayfasına git
      cy.get('input[type="email"]').type('invalid-email'); // Geçersiz email
      cy.get('button[type="submit"]').should('be.disabled'); // Buton disabled olmalı
      
      // Hata mesajını kontrol et
      cy.contains('Email formatı geçersiz');
    });
  
    it('should show an error message when password is invalid', () => {
      cy.visit('/'); // App'in ana sayfasına git
      cy.get('input[type="email"]').type('test@example.com'); // Geçerli email
      cy.get('input[type="password"]').type('weakpass'); // Geçersiz şifre
      cy.get('button[type="submit"]').should('be.disabled'); // Buton disabled olmalı
      
      // Hata mesajını kontrol et
      cy.contains('Şifre en az 8 karakter olmalı, büyük harf, küçük harf ve rakam içermeli');
    });
  
    it('should show an error message when terms are not accepted', () => {
      cy.visit('/'); // App'in ana sayfasına git
      cy.get('input[type="email"]').type('test@example.com'); // Geçerli email
      cy.get('input[type="password"]').type('StrongPassword123'); // Geçerli şifre
      cy.get('button[type="submit"]').should('be.disabled'); // Buton disabled olmalı
    });
  });