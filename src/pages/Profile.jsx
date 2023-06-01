import axios from "axios";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";
/*import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";*/
import styles from './styles/Profile.module.css'
import NotFoundPage from "./NotFoundPage";
import ProfileComment from "../components/ProfileComment";
import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {
    /*
    if(Cookies.get("token")){
        const loggedUserId = jwtDecode(Cookies.get("token")).id
    }
*/
    const { userId } = useParams();

    const { data: user, isLoading,isError, error } = useQuery("user", async() => {
        return axios.get(`http://${window.location.hostname}:5000/users/profile/${userId}`, {withCredentials:true}).then((res) => res.data);
    },{ 
        retry: false
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <NotFoundPage/>
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(user)
  return (
        <div className={styles.profileContainer}>
            <aside className={styles.profileComments}>
                {user.comments.map(comment => (
                    <ProfileComment comment={comment}/>
                ))
                }
            </aside>
            <ProfileInfo user={{ ...user, comments: undefined }}/>
        </div>
  )
}

export default Profile