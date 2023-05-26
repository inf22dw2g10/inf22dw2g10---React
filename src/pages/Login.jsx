import axios from "axios";

const Login = () => {
  const handleGithubAuth = async () => {
    axios.get('http://localhost:3000/users/auth/github') 
      .then(response => {
        window.open(response.data.callback, "_top","width=325,height=350,resizable=no,menubar=no,titlebar=no,toolbar=no");
      })
      .catch(error => {
        console.error('An error occurred while initiating Github authentication:', error);
      });
  };

  return (
    <div>
      <button onClick={handleGithubAuth}> Authenticate with Github</button>
    </div>
  );
}

export default Login