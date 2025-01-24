import { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const initialFormData = {
  email: '',
  password: '',
  termsAccepted: false,
};

export default function Login(props) {
  const { onLoginSuccess } = props;
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({ email: '', password: '', terms: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newState = { ...formData, [name]: value };
    setFormData(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let formValid = true;
    let newErrors = { email: '', password: '', terms: '' };

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
      formValid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Şifre en az 8 karakter, bir harf ve bir rakam içermelidir';
      formValid = false;
    }

    if (!formData.termsAccepted) {
      newErrors.terms = 'Şartları kabul etmeniz gerekmektedir';
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      axios
        .post('https://reqres.in/api/users', formData)
        .then((res) => {
          console.log(res);
          onLoginSuccess(res.data); // Success callback
          setFormData(initialFormData);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsSubmitting(false));
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            id="email"
            name="email"
            placeholder="Email address"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
          {errors.email && <Alert color="danger">{errors.email}</Alert>}
        </FormGroup>

        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
          {errors.password && <Alert color="danger">{errors.password}</Alert>}
        </FormGroup>

        <FormGroup>
          <Label>
            <Input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
            />
            Accept Terms and Conditions
          </Label>
          {errors.terms && <Alert color="danger">{errors.terms}</Alert>}
        </FormGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </Button>
      </Form>
    </div>
  );
}