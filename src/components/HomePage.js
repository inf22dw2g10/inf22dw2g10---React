// HomePage.js

import React from 'react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);

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
      <h1>Welcome to the GAS !</h1>
      <button type="button" onClick={handleGoToLogin}>
          Login
      </button>
      {/* Add your home page content here */}
    </div>
  );
}

export default HomePage;