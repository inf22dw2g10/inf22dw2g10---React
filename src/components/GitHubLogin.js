import React, { useState } from 'react';

const GithubLogin = () => {
    const setErrorMessage = useState('');

    const handleGithubLogin = async () => {
        try {
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = 'http://localhost:3000/users/auth/github';
        } catch (error) {
          console.log(error);
          // Handle the error
          setErrorMessage('An error occurred while initiating GitHub authentication.');
        }
      };

  return (
    <div>
      <button onClick={handleGithubLogin}>Login with GitHub</button>
    </div>
  );
};

export default GithubLogin;