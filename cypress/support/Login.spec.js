describe('Login Form Testi', () => {

    // Başarılı giriş testi
    it('Başarılı form doldurulduğunda submit edebiliyorum ve success sayfasına yönleniyorum', () => {
      cy.visit('http://localhost:5173'); // Uygulamanın çalıştığı URL
  
      // Formu geçerli bilgilerle doldur
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('Password123');
      cy.get('input[type="checkbox"]').check(); // Şartları kabul et
      cy.get('button[type="submit"]').click(); // Giriş yap butonuna tıkla
  
      // Success sayfasına yönlendirildiğini kontrol et
      cy.url().should('include', '/success');
      cy.contains('Success'); // Success sayfasında 'Success' yazısı olup olmadığını kontrol et
    });
  
    // Hatalı email girişi testi
    it('Geçersiz email girişi ile hata mesajı ve buton disabled durumda', () => {
      cy.visit('http://localhost:5173');
  
      // Geçersiz email gir
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('button[type="submit"]').click(); // Giriş yap butonuna tıkla
  
      // Hata mesajının doğru olduğunu kontrol et
      cy.contains('Geçerli bir email adresi giriniz').should('be.visible');
  
      // Butonun disabled olduğunu kontrol et
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
    // Hatalı email ve password girişi testi
    it('Geçersiz email ve password girişi ile iki hata mesajı ve buton disabled durumda', () => {
      cy.visit('http://localhost:5173');
  
      // Geçersiz email ve şifre gir
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click(); // Giriş yap butonuna tıkla
  
      // Hata mesajlarının doğru olduğunu kontrol et
      cy.contains('Geçerli bir email adresi giriniz').should('be.visible');
      cy.contains('Şifre en az 8 karakter, bir harf ve bir rakam içermelidir').should('be.visible');
  
      // Butonun disabled olduğunu kontrol et
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
    // Şartları kabul etmeden giriş yapma testi
    it('Email ve password doğru ama kuralları kabul etmedim, buton disabled durumda', () => {
      cy.visit('http://localhost:5173');
  
      // Geçerli email ve şifre gir
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('Password123');
      
      // Şartları kabul etme
      cy.get('button[type="submit"]').click(); // Giriş yap butonuna tıkla
  
      // Hata mesajının göründüğünü kontrol et
      cy.contains('Şartları kabul etmeniz gerekmektedir').should('be.visible');
  
      // Butonun disabled olduğunu kontrol et
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
  });