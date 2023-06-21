import axios from "axios";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";
import styles from './styles/Game.module.css'
import NotFoundPage from "./NotFoundPage";
import GameInfo from "../components/Game/GameInfo";
import GameComment from "../components/Game/GameComment";
import CommentForm from "../components/Game/CommentForm";
import leftArrow from '../images/left-arrow.png'
import rightArrow from '../images/right-arrow.png'

const Game = () => {
    const { gameId } = useParams();

    const { data: comments, isLoading, isError, error, refetch } = useQuery("comment", async() => {
        return axios.get(`http://${window.location.hostname}:5000/comments/game/${gameId}`).then((res) => res.data);
    },{ 
        retry: false
    });

    if (isLoading || error) {
        return <div>Loading...</div>;
    }
    if(isError){
        <NotFoundPage/>
    }

    const scrollCommentsLeft = () => {
        const container = document.getElementById("userCommentsList");
        if (container) {
          container.scrollLeft -= container.offsetWidth ;
        }
    };
    
    const scrollCommentsRight = () => {
        const container = document.getElementById("userCommentsList");
        if (container) {
            container.scrollLeft += container.offsetWidth;
        }
    };

    const handleNewComment = () =>{
        refetch()
    }
    
    return (
        <div className={styles.gameContainerWrapper}>
            <div className={styles.gameContainer}>
                <GameInfo gameId={gameId} />
                <div className={styles.userCommentsListContainer} >
                    <div className={styles.userCommentsList} id="userCommentsList" >
                            
                            {comments && comments.map(comment => (
                                    <GameComment comment={comment} key={comment.id} />
                            ))}
                            {comments.length === 0 && "No Comments to display"}
                    </div>
                    {comments.length > 1 &&
                    <>
                        <button className={styles.commentsLeftArrow} onClick={scrollCommentsLeft}><img src={leftArrow} alt="<"/></button>
                        <button className={styles.commentsRightArrow}  onClick={scrollCommentsRight}><img src={rightArrow} alt=">"/></button>
                    </>
                    }
                </div>           
                <CommentForm gameId={gameId} commentCreate={handleNewComment}/>
            </div>
        </div>
        
    );
}

export default Game;
/* 
                */