import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Registration successful');
          // Perform any necessary actions on successful registration
          // Clear form fields after registration
          setUsername('');
          setEmail('');
          setPassword('');
        } else {
          throw new Error('Registration failed');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
        setErrorMessage('Network error occurred. Please try again later.');
      });
  };
  
  

  const handleGoToLogin = () => {
    setRedirectToLogin(true);
  };

  React.useEffect(() => {
    if (redirectToLogin) {
      history.push('/login');
      window.location.reload();
    }
  }, [redirectToLogin, history]);

  return (
    <div>
      <h1>Register Page</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <button type="button" onClick={handleGoToLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
