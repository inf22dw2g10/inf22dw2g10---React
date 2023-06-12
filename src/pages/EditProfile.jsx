import styles from './styles/EditProfile.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingPage from './LoadingPage'
import { Link } from 'react-router-dom';
import EditName from '../components/EditProfile/EditName'
import EditDescription from '../components/EditProfile/EditDescription';
import EditPassword from '../components/EditProfile/EditPassword';

const EditProfile = () => {

    // Get User Data

    const { data: myData, isLoading, error, isError } = useQuery("myData", async () => {
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

    return (
        <div className={styles.editProfileContainer}>
            <div className={styles.formsWrapper}>
                <Link to={`/profile/${myData.userData.id}`}>Back</Link>
                <EditName username={myData.userData.username}/>
                <EditDescription description={myData.userData.description}/>
                <EditPassword />
            </div>
        </div>
    )
}

export default EditProfile