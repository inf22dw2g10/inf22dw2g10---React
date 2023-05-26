import React from 'react';
import GitHubLogin from './GitHubLogin';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showLoginBox, setShowLoginBox] = React.useState(false);

  const handleGoToLogin = () => {
    setShowLoginBox(true);
  };

  const handleCloseLoginBox = () => {
    setShowLoginBox(false);
  };

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/check-login');

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div>
      <h1>Welcome to the GAS!</h1>
      {/* Add your home page content here */}
      {showLoginBox && !isLoggedIn && <GitHubLogin onClose={handleCloseLoginBox} />}
      {!isLoggedIn && (
        <button type="button" onClick={handleGoToLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default HomePage;
