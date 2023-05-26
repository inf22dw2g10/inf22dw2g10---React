// GitHubLogin.js

import React from 'react';

const GitHubLogin = ({ onClose }) => {
  const handleGithubLogin = async () => {
    try {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = 'http://localhost:3000/users/auth/github'; // Replace with your backend URL
    } catch (error) {
      console.log(error);
      // Handle the error
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 9999,
      }}
    >
      <h2>Login Box</h2>
      {/* Add your login box content here */}
      <button type="button" onClick={handleGithubLogin}>
        Login with GitHub
      </button>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default GitHubLogin;
