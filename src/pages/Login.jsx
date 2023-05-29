import axios from "axios";
import gitHublogo from '../images/github-logo.png';
import isEmailImg from '../images/swap3.png';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const Login = () => {

  const [emailLogin, setEmailLogin] = useState(false);
  const [axiosError, setAxiosError] = useState(null);
  const [oauthError, setOauthError] = useState(null);

  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    emailLogin: yup.boolean().required(),
    username: yup.lazy((value) =>
      value ? yup.string().required('Username is required') : yup.string()
    ),
    email: yup.lazy((value) =>
      value ? yup.string().email().required('Email is required') : yup.string().email()
    ),
    password: yup.string().min(4, 'Password must have at least 4 characters').required('Password is required'),
  });
  
  

  const { register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(loginSchema)
  });

  
  const handleGithubAuth = async () => {
    axios.get('http://localhost:3000/users/auth/github') 
      .then(response => {
        window.open(response.data.callback, "_top","resizable=no,menubar=no,titlebar=no,toolbar=no");
      })
      .catch(error => {
        setOauthError("Error trying to login")
      });
  };

  const loginSubmit = async (data) =>{    
    const username = data.username
    const email = data.email
    const password = data.password

    try{
      if(emailLogin){
        await axios.post(
          "http://localhost:3000/users/login",
          {
            email:email,
            password:password,
          },{
            withCredentials: true
          }
        )
        navigate("/check-login");

      }else{
        await axios.post(
          "http://localhost:3000/users/login",
          {
            username:username,
            password:password,
          },{
            withCredentials: true
          }
        )
        navigate("/check-login");
      }
      
    }catch(err){
      if(err.response?.status === 403){
        setAxiosError("User not registered")
      }
      else if(err.response?.status === 401){
        setAxiosError("Wrong password")
      }
      else{
        setAxiosError("Error trying to login")
      }
    }
    
    
    
  }

  return (
    <>
      <div className="form-wrapper">
        <form action="" method="post" onSubmit={handleSubmit(loginSubmit)}>
          <h1>Login</h1>
          <p>{emailLogin ? (<input type="text" name="email" placeholder="Email"  autoComplete="off" {...register("email")}/>) : (<input type="text" name="username" placeholder="Username"  autoComplete="off" {...register("username")}/>)}
          <input type="checkbox" className="is-email" id="is-email" {...register("emailLogin")} checked={emailLogin} onChange={() => setEmailLogin(!emailLogin)} /><label htmlFor="is-email"><img src={isEmailImg} draggable="false" alt="Change" className="is-email-img"  /></label>
          </p> 
          <p className="form-error-message">{errors.username?.message}</p>
          <p className="form-error-message">{errors.email?.message}</p>
          <p><input type="password" name="password" placeholder="Password"  autoComplete="off"{...register("password")} /></p>
          <p className="form-error-message">{errors.password?.message}</p>
          <p className="form-error-message" >{axiosError && axiosError}</p>
          <p><input type="submit" value="Login"/></p>
          <h4>Don't have an account? <Link to="/register">Register here</Link></h4>
          <h4>or</h4>
          <h2>Sign In/Up with</h2>
          <p className="form-error-message" >{oauthError && oauthError}</p>
          <p className="github-link"><Link onClick={handleGithubAuth}><img src={gitHublogo} className="oauth-image" alt="GitHub" height="50px"/></Link></p>
        </form>
      </div>
    </>
  );
}

export default Login
