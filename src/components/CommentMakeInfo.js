import styles from '../pages/styles/CommentMake.module.css'
import axios from 'axios';
import { useQuery} from 'react-query';


const CommentMakeInfo = ({gameId}) => {
    

    const { data: comment, isLoading, isError, error } = useQuery("comment", async() => {
        return axios.get(`http://${window.location.hostname}:5000/comments/game/${gameId}`, { withCredentials: true }).then((res) => res.data);
    },{ 
        retry: false
    });

    if (isLoading || error) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.commentMakeContainerWrapper}>
            <div className={styles.commentMakeContainer}>
                <p><input type="text" name="comment"/></p>
            </div>
        </div>
    )
}


export default CommentMakeInfo;