import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginPage  ()  {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const history = useHistory();


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    const isFormValid = isEmailValid && isPasswordValid && acceptedTerms;

    const handleSubmit = () => {
        if (isFormValid) {
            history.push("./succes")
        }
        else {
            alert("lütfen formu tam doldurunuz")
        }
    }






    return (
        <form onSUbmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    I accept the terms and conditions
                </label>
            </div>
            <button type="submit" disabled={!isFormValid}>
                Login
            </button>



        </form>
    )
}