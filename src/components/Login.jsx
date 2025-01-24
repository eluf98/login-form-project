import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', terms: '' });

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formValid = true;
    let newErrors = { email: '', password: '', terms: '' };

    if (!validateEmail(email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
      formValid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Şifre en az 8 karakter, bir harf ve bir rakam içermelidir';
      formValid = false;
    }

    if (!termsAccepted) {
      newErrors.terms = 'Şartları kabul etmeniz gerekmektedir';
      formValid = false;
    }

    setErrors(newErrors);
    if (formValid) {
      // Form geçerli ise Success sayfasına yönlendirme veya başka işlem yapılabilir.
      console.log('Form başarılı!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            Şartları kabul ediyorum
          </label>
          {errors.terms && <p>{errors.terms}</p>}
        </div>

        <button type="submit" disabled={!validateEmail(email) || !validatePassword(password) || !termsAccepted}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;