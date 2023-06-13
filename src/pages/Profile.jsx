import axios from "axios";

import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";
import styles from './styles/Profile.module.css'
import NotFoundPage from "./NotFoundPage";
import ProfileGames from "../components/Profile/ProfileGames";
import ProfileComments from "../components/Profile/ProfileComments";
import ProfileInfo from "../components/Profile/ProfileInfo";
import { useEffect,useContext } from "react";
import AuthContext from '../providers/AuthProvider'
import LoadingPage from './LoadingPage'
import leftArrow  from '../images/left-arrow.png'
import  rightArrow  from '../images/right-arrow.png'

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { userId } = useParams();

    const { data: userProfile, isLoading, isError, error, refetch } = useQuery("user", () => {
        return axios.get(`http://${window.location.hostname}:5000/users/profile/${userId}`, {withCredentials: true}).then((res) => res.data);
    }, { 
        retry: false
    });

    useEffect(() => {
        refetch()
    }, [userId, refetch]);

    if (isLoading ) {
        return <LoadingPage/>
    }

    if ( error || isError ) {
        return <NotFoundPage/>
    }
    
    const scrollGameLeft = () => {
        const container = document.getElementById("userGamesList");
        if (container) {
          container.scrollLeft -= container.offsetWidth ;
        }
    };
    
    const scrollGameRight = () => {
    const container = document.getElementById("userGamesList");
    if (container) {
        container.scrollLeft += container.offsetWidth ;
    }
    };
    const scrollCommentsLeft = () => {
        const container = document.getElementById("userCommentsList");
        if (container) {
          container.scrollLeft -= container.offsetWidth ;
        }
    };
    
    const scrollCommentsRight = () => {
    const container = document.getElementById("userCommentsList");
    if (container) {
        container.scrollLeft += container.offsetWidth ;
    }
    };

    return (
        <div className={styles.profileContainerWrapper}>
            <div className={styles.profileContainer}>
                <ProfileInfo userProfile={userProfile}/>

                <div className={styles.userGamesListContainer} >
                    <h3>{user.id !== userProfile.id ? `${userProfile.username}'s` : 'Your'} Games</h3>
                    <div className={styles.userGamesList} id="userGamesList" >
                        
                        {userProfile && userProfile.games && userProfile.games.map(game => (
                                <ProfileGames game={game} key={game.id} />
                        ))}
                        {userProfile.games.length === 0 && "No Games to display"}
                    </div>

                    {userProfile.games.length > 2 &&
                        <>
                            <button className={styles.gamesLeftArrow} onClick={scrollGameLeft}><img src={leftArrow} alt="<"/></button>
                            <button className={styles.gamesRightArrow}  onClick={scrollGameRight}><img src={rightArrow} alt=">"/></button>
                        </>
                    }
                </div>
                <div className={styles.userCommentsListContainer} >
                    <h3>{user.id !== userProfile.id ? `${userProfile.username}'s` : 'Your'} Comments</h3>
                    <div className={styles.userCommentsList} id="userCommentsList" >
                            
                            {userProfile && userProfile.comments && userProfile.comments.map(comment => (
                                    <ProfileComments comment={comment} key={comment.id} />
                            ))}
                            {userProfile.comments.length === 0 && "No Comments to display"}
                    </div>
                    {userProfile.comments.length > 1 &&
                    <>
                        <button className={styles.commentsLeftArrow} onClick={scrollCommentsLeft}><img src={leftArrow} alt="<"/></button>
                        <button className={styles.commentsRightArrow}  onClick={scrollCommentsRight}><img src={rightArrow} alt=">"/></button>
                    </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;
