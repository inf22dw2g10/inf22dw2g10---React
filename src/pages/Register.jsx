import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './styles/Forms.module.css'

const Register = () => {
  
  const navigate = useNavigate();

  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const [axiosError, setAxiosError] = useState(null);

  useEffect(() => {
    if (registrationSuccessful) {

      setAxiosError(null)

      const timeout = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [navigate,registrationSuccessful]);

  const registerSchema = yup.object().shape({
    username: yup.string().required("Username is required").max(15, 'Username can take up to 15 characters') ,
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4,"Password is must have, at least, 4 characters").required("Password is required"),
    repeatPassword: yup.string().oneOf([yup.ref("password"),null],"Password don't match"),
  })

  const { register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(registerSchema)
  });


  const registerSubmit = async (data) =>{    
    const username = data.username
    const email = data.email
    const password = data.password
    try{
      await axios.post(
        `http://${window.location.hostname}:5000/users/register`,
        {
          username:username,
          email:email,
          password:password,
        }
      )
      setRegistrationSuccessful(true)
    }catch(err){
      if(err.response?.status === 409){
        setAxiosError("User or email already registered")
      }else{
        setAxiosError("Error trying to register")
      }
    }
  }

  return (
      <div className={styles.formWrapper}>
        <form action="" method="post" onSubmit={handleSubmit(registerSubmit)}>
          <h1>Register</h1>
          <h3 className={styles.formSuccessMessage}>{registrationSuccessful &&  "Registration Successful, You will be redirect to login page"}</h3>
          <p><input type="text" name="username" placeholder="Username"  autoComplete="off" {...register("username")}/></p>
          <p className={styles.formErrorMessage}>{errors.username?.message}</p>
          <p><input type="email"  name="email" placeholder="Email"  autoComplete="off" {...register("email")}/></p>
          <p className={styles.formErrorMessage}>{errors.email?.message}</p>
          <p><input type="password" name="password" placeholder="Password"  autoComplete="off" {...register("password")}/></p>
          <p className={styles.formErrorMessage}>{errors.password?.message}</p>
          <p><input type="password" name="repeat-password" placeholder="Repeat Password"  autoComplete="off" {...register("repeatPassword")}/></p>
          <p className={styles.formErrorMessage}>{errors.repeatPassword?.message}</p>
          <p className={styles.formErrorMessage} >{axiosError && axiosError}</p>
          <p><input type="submit" value="Register"/></p>
          <h4>Already have an account? <Link to="/login">Login here</Link></h4>
        </form>
      </div>

  );
}


export default Register