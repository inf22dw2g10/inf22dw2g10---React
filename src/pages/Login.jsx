import axios from "axios";
import gitHublogo from '../images/github-logo.png';
import isEmailImg from '../images/swap3.png';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './styles/Forms.module.css'
import AuthContext from '../providers/AuthProvider'
import { useContext  } from "react";

const Login = () => {

  const { login } = useContext(AuthContext);
  const [emailLogin, setEmailLogin] = useState(false);
  const [axiosError, setAxiosError] = useState(null);
  const [oauthError, setOauthError] = useState(null);

  const loginSchema = yup.object().shape({
    emailLogin: yup.boolean().required(),
    username: yup.lazy((value) =>
      value ? yup.string().required('Username is required').max(15, 'Username can take up to 15 characters') : yup.string()
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
    axios.get(`http://${window.location.hostname}:5000/users/auth/github`) 
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
          `http://${window.location.hostname}:5000/users/login`,
          {
            email:email,
            password:password,
          },{
            withCredentials: true
          }
        )
        login()

      }else{
        await axios.post(
          `http://${window.location.hostname}:5000/users/login`,
          {
            username:username,
            password:password,
          },{
            withCredentials: true
          }
        )
        login()
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
      <div className={styles.formWrapper}>
        <form action="" method="post" onSubmit={handleSubmit(loginSubmit)}>
          <h1>Login</h1>
          <p>{emailLogin ? (<input type="email" name="email" className={styles.inputLoginEmailUser} placeholder="Email"  autoComplete="off" {...register("email")}/>) : (<input type="text" className={styles.inputLoginEmailUser} name="username" placeholder="Username"  autoComplete="off" {...register("username")}/>)}
          <input type="checkbox" className={styles.isEmail}  id="is-email" {...register("emailLogin")} checked={emailLogin} onChange={() => setEmailLogin(!emailLogin)} /><label htmlFor="is-email"><img src={isEmailImg} alt="Change" draggable="false" className={styles.isEmailImg}  /></label>
          </p> 
          <p className={styles.formErrorMessage}>{errors.username?.message}</p>
          <p className={styles.formErrorMessage}>{errors.email?.message}</p>
          <p><input type="password" name="password" placeholder="Password"  autoComplete="off"{...register("password")} /></p>
          <p className={styles.formErrorMessage}>{errors.password?.message}</p>
          <p className={styles.formErrorMessage} >{axiosError && axiosError}</p>
          <p><input type="submit" value="Login"/></p>
          <h4>Don't have an account? <Link to="/register">Register here</Link></h4>
          <h4>or</h4>
          <h2>Sign In/Up with</h2>
          <p className={styles.formErrorMessage}>{oauthError && oauthError}</p>
          <p className={styles.githubLink}><Link onClick={handleGithubAuth}><img src={gitHublogo} className={styles.oauthImage} alt="GitHub" height="50px"/></Link></p>
        </form>
      </div>
  );
}

export default Login
