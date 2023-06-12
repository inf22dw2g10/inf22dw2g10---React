import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from '../../pages/styles/EditProfile.module.css'
import { useState } from 'react';
import axios from 'axios';

const EditDescription = ({description}) => {

  const [axiosError, setAxiosError] = useState(null);
  const [descriptionChangeSuccessful, setDescriptionChangeSuccessful] = useState(false);

  // Form Handling

  const changeDescriptionSchema = yup.object().shape({
      newDescription:  yup.string().required('Description is required')
  });
  
  

  const { register, handleSubmit, formState:{errors}} = useForm({
      resolver: yupResolver(changeDescriptionSchema)
  });


  const changeDescriptionSubmit = async (data) =>{
      const newDescription = data.newDescription
      try{
          await axios.patch(
          `http://${window.location.hostname}:5000/users/changeDescription`,
          {
            newDescription:newDescription
          },{
            withCredentials: true
          })
          setDescriptionChangeSuccessful(true)
      }catch(err){
          setAxiosError(err.message)
      }

  }



    return (
        <form className={styles.editWrapper} action="" method="post" onSubmit={handleSubmit(changeDescriptionSubmit)}> 
            <h2>Change Description</h2>
            {descriptionChangeSuccessful && <p>Description updated successfully!</p>}
            {!axiosError && errors.newDescription && <p>{errors.username?.message}</p>}
            {axiosError && !errors.newDescription && <p>{axiosError}</p>}
            <p><textarea name="description"  placeholder={description ? description : "No description"} {...register("newDescription")}/></p>
            <p><input type="submit"  value="Change Description" /></p>
        </form>
    )
}

export default EditDescription