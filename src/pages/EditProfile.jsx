import styles from './styles/EditProfile.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingPage from './LoadingPage'
import { Link } from 'react-router-dom';

const EditProfile = () => {

    const { data: myData, isLoading, error, isError } = useQuery("myData", () => {
        return axios.get(`http://${window.location.hostname}:5000/users/mydata`,{withCredentials:true}).then((res) => res.data);
    },{ 
        retry: false
    });

    if (isLoading || error) {
        return <LoadingPage/>;
    }

    if (isError) {
        return <div>Error retrieving data</div>;
    }
    console.log(myData)

  return (
    <div className={styles.editProfileContainer}>
        
        <div className={styles.formsWrapper}>
            <Link to={`/profile/${myData.userData.id}`}>Back</Link>
            <form className={styles.editWrapper}>
                <h2>Change Name</h2>
                <p><input type="text"  name="username" placeholder={myData.userData.username} autoComplete='off' /></p>
                <p><input type="submit"  value="Change Name" /></p>
            </form>
            
            <form className={styles.editWrapper}> 
                <h2>Change Description</h2>
                <p><textarea name="description"  placeholder={myData.userData.description ? myData.userData.description : "No description"} /></p>
                <p><input type="submit"  value="Change Description" /></p>
            </form>
            
            <form className={styles.editWrapper}>
                <h2>Change Email</h2>
                <p><input type="email" name="email" placeholder={myData.userData.email} autoComplete='off'/></p>
                <p><input type="submit" value="Change Email" /></p>
            </form>
            
            <form className={styles.editWrapper}>
                <h2>Change Password</h2>
                <p><input type="password" name="oldPassword" placeholder='Old password' autoComplete='off'/></p>
                <p><input type="password" name="newPassword" placeholder='New password' autoComplete='off'/></p>
                <p><input type="password" name="checkNewPassword" placeholder='Repeat new password' autoComplete='off'/></p>
                <p><input type="submit" value="Change Password" /></p>
            </form>
        </div>
    </div>
  )
}

export default EditProfile