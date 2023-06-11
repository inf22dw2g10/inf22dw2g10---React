import styles from '../pages/styles/Comments.module.css'
import axios from 'axios';
import { useQuery} from 'react-query';
import GameComment from "../components/GameComment";


const CommentsInfo = ({gameId}) => {
    

    const { data: comment, isLoading, isError, error } = useQuery("comment", async() => {
        return axios.get(`http://${window.location.hostname}:5000/comments/game/${gameId}`).then((res) => res.data);
    },{ 
        retry: false
    });

    if (isLoading || error) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.commentContainerWrapper}>
            <div className={styles.commentContainer}>
                {comment.map((commentText) => (
                    <div key={commentText.id} className={styles.commentText}>
                        <GameComment comment={commentText} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsInfo