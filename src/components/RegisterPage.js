import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);

  const handleRegister = () => {
    // Perform registration logic here
    // You can send the registration data to an API or perform any other necessary actions
    console.log('Registration data:', { username, email, password });
    // Clear form fields after registration
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleGoToLogin = () => {
    setRedirectToLogin(true);
  };

  React.useEffect(() => {
    if (redirectToLogin) {
      history.push('/login');
      window.location.reload()
    }
  }, [redirectToLogin, history]);

  return (
    <div>
      <h1>Register Page</h1>
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