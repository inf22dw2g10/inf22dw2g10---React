import styles from '../../pages/styles/Game.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import thumbsUp from '../../images/thumb-up.png'
import thumbsDown from '../../images/thumb-down.png'


const CommentsInfo = ({comment}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`http://${window.location.hostname}:5000/users/profile/${comment.UserId}`, {withCredentials:true}).then((res) => {
            setUser(res.data)
        }).catch((err) => {
            console.log(err)
        });


    }, [comment])
    
    return (
        <div className={styles.userComment}>
            <div className={styles.userInfo}>   
                <div><img src={user.avatar} alt='User Avatar'/> {user.username}</div>
                <div>{comment.rating ? <img src={thumbsUp} alt='Thumbs Up' className={styles.commentsRating}/>: <img src={thumbsDown} alt='Thumbs down' className={styles.commentsRating}/>}<span style={comment.rating ? {color:'rgb(0, 138, 100) '} : {color:'rgb(138, 40, 40)'}} className={styles.commmentContentGameName}></span></div>
                
            </div>
            <div className={styles.commentInfo}>
                {comment.text}
            </div>
            
        </div>
    );
}

export default CommentsInfo