import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from '../../pages/styles/EditProfile.module.css'
import { useState } from 'react';
import axios from 'axios';



const EditPassword = () => {

  const [axiosError, setAxiosError] = useState(null);
  const [passwordChangeSuccessful, setPasswordChangeSuccessful] = useState(false);

  // Form Handling

  const changePasswordSchema = yup.object().shape({
      oldPassword: yup.string().min(4,"Password is must have, at least, 4 characters").required("Password is required"),
      newPassword: yup.string().min(4,"Password is must have, at least, 4 characters").required("Password is required"),
      newPasswordRepeat: yup.string().oneOf([yup.ref("newPassword"),null],"Password don't match"),
  });
  
  

  const { register, handleSubmit, formState:{errors}} = useForm({
      resolver: yupResolver(changePasswordSchema)
  });


  const changePasswordSubmit = async (data) =>{

      const oldPassword = data.oldPassword
      const newPassword = data.newPassword

      try{
          await axios.patch(
          `http://${window.location.hostname}:5000/users/changePassword`,
          {
              oldPassword:oldPassword,
              newPassword:newPassword
          },{
              withCredentials: true
          })
          setPasswordChangeSuccessful(true)

      }catch(err){
          setAxiosError(err.message)
      }

  }

  return (
    <form className={styles.editWrapper} action="" method="post" onSubmit={handleSubmit(changePasswordSubmit)}>
        <h2>Change Password</h2>
        {passwordChangeSuccessful && <p>Password updated successfully</p>}
        {!passwordChangeSuccessful && axiosError && !errors.newUsername && <p>{axiosError}</p>}
        {!passwordChangeSuccessful &&!axiosError && errors.oldPassword && <p>{errors.oldPassword?.message}</p>}
        <p><input type="password" name="oldPassword" placeholder='Old password' {...register('oldPassword')} autoComplete='off'/></p>
        {!passwordChangeSuccessful && !axiosError && errors.newPassword && <p>{errors.newPassword?.message}</p>}
        <p><input type="password" name="newPassword" placeholder='New password' {...register('newPassword')} autoComplete='off'/></p>
        {!passwordChangeSuccessful && !axiosError && errors.newPasswordRepeat && <p>{errors.newPasswordRepeat?.message}</p>}
        <p><input type="password" name="checkNewPassword" placeholder='Repeat new password' {...register('newPasswordRepeat')} autoComplete='off'/></p>
        <p><input type="submit" value="Change Password" /></p>
    </form>
  )
}

export default EditPassword