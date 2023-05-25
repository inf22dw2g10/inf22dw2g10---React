import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthCallBackPage = () => {
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      fetch('http://localhost:3000/users/auth/github/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Logged In') {
            // Redirect to the home page or any other page after successful authentication
            history.push('/');
          } else {
            // Handle login failure or display error message
          }
        })
        .catch((error) => {
          // Handle network errors or display error message
        });
    }
  }, [history]);

  return (
    <div>
      <h2>Auth Callback Page</h2>
      <p>Processing authentication...</p>
    </div>
  );
};

export default AuthCallBackPage;