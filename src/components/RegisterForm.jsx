import React from 'react'
import axios from 'axios';
import { useState } from 'react';




const RegisterForm = () => {

  const [errors, setErrors] = useState({});

  async function onSubmit(e){

    e.preventDefault()
    
    const formData = new FormData(e.target);

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    

    const validationErrors = {};
    const axiosErrors = {};

    if(username === ""){
      validationErrors.username = "Username is required"
    }
    if(email === ""){
      validationErrors.email = "Email is required"
    }
    if(password === ""){
      validationErrors.password = "Password is required"
    }
    
    if(Object.keys(validationErrors).length === 0){
      try{
        const response = await axios.post(
          "http://localhost:3000/users/register",
          {
            username:username,
            password:password,
            email:email,
          }
        )
        console.log(response)
      
      }catch (error) {
        axiosErrors.axios = error.message
        setErrors(axiosErrors)
      }
    }else{
      setErrors(validationErrors);
    }

  }

  return (
    <form method='POST' action='' onSubmit={onSubmit}>
      <p>{Object.keys(errors).axios !== 0 ? errors.axios : ""}</p>
      <p>{Object.keys(errors).username !== 0 ? errors.username : ""} <input type="text" name="username" id=""  placeholder='Username'/></p>
      <p>{Object.keys(errors).email !== 0 ? errors.email : ""}<input type="email" name="email" id="" placeholder='Email' /></p>
      <p>{Object.keys(errors).password !== 0 ? errors.password : ""}<input type="password" name="password" placeholder='Password' id=""/></p>
      <input type="submit" value="Register" />
    </form>
  )
}

export default RegisterForm