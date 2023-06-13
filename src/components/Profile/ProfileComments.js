import styles from '../../pages/styles/Profile.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import thumbsUp from '../../images/thumb-up.png'
import thumbsDown from '../../images/thumb-down.png'


const ProfileComment = ({comment}) => {

  const [game, setGame] = useState({})

  useEffect( () => {

    axios.get(`http://${window.location.hostname}:5000/games/${comment.GameId}`, { withCredentials: true })
    .then((res) => {
      setGame((prevGame) => ({
        ...prevGame,
        title: res.data.title,
        cover: res.data.cover
      }));
    })
    .catch((error) => {
    });
  }, [comment.GameId])
      
  return (
      <div className={styles.userComment}>
          <div className={styles.userCommentInner} >
            <div className={styles.commmentGameCover} style={{ backgroundColor: "rgb(70,70,70)", backgroundImage: `url(${game.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <span>{game.title}</span>
            </div>
            <div className={styles.commmentContentContainer}>
              <div className={styles.commmentContent}>
                  <p>{comment.rating ? <img src={thumbsUp} alt='Thumbs Up' className={styles.commentsRating}/>: <img src={thumbsDown} alt='Thumbs down' className={styles.commentsRating}/>}<span style={comment.rating ? {color:'rgb(0, 138, 100) '} : {color:'rgb(138, 40, 40)'}} className={styles.commmentContentGameName}>{game.title}</span></p><br/>
                  <p>{comment.text}</p>
              </div>
            </div>
          </div>
      </div>
  )
}

export default ProfileComment