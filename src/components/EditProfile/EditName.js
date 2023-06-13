import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from '../../pages/styles/EditProfile.module.css'
import { useState } from 'react';
import axios from 'axios';

const EditName = ({username}) => {

    const [axiosError, setAxiosError] = useState(null);
    const [nameChangeSuccessful, setNameChangeSuccessful] = useState(false);

    // Form Handling

    const changeNameSchema = yup.object().shape({
        newUsername:  yup.string().test('same', 'Username is not allowed', (value) => value !== username ).required('Username is required').max(15, 'Username can take up to 15 characters')
    });
    
    

    const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(changeNameSchema)
    });


    const changeNameSubmit = async (data) =>{
        const newUsername = data.newUsername
        try{
            await axios.patch(
            `http://${window.location.hostname}:5000/users/changeName`,
            {
                newName:newUsername
            },{
                withCredentials: true
            })
            setNameChangeSuccessful(true)
        }catch(err){
            setAxiosError(err.message)
        }

    }



    return (
        <form className={styles.editWrapper} action="" method="post" onSubmit={handleSubmit(changeNameSubmit)}>
            <h2>Change Name</h2>
            {nameChangeSuccessful && <p>Username updated successfully</p>}
            {!axiosError && errors.newUsername && <p>{errors.newUsername?.message}</p>}
            {axiosError && !errors.newUsername && <p>{axiosError}</p>}
            <p><input type="text"  name="username" placeholder={username} autoComplete='off' {...register("newUsername")}/></p>
            <p><input type="submit"  value="Change Name" /></p>
        </form>
    )
}

export default EditName