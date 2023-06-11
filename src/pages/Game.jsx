import axios from "axios";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";
import styles from './styles/Game.module.css'
import NotFoundPage from "./NotFoundPage";
import GameInfo from "../components/GameInfo";
import CommentsInfo from "../components/CommentsInfo";
import CommentMakeInfo from "../components/CommentMakeInfo";

const Game = () => {
    const { gameId } = useParams();

    const { data: game, isLoading,isError, error } = useQuery("game", async() => {
        return axios.get(`http://${window.location.hostname}:5000/games/${gameId}`).then((res) => res.data);
    },{ 
        retry: false
    });

    if (isLoading || error) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <NotFoundPage/>
    }

    return (
        <div className={styles.gameContainerWrapper}>
            <div className={styles.gameContainer}>
                <GameInfo gameinfo={game}/>
                <CommentsInfo game={game} gameId={game.id}/>
                <CommentMakeInfo game={game} gameId={game.id}/>
            </div>
        </div>
        
    );
}

export default Game;
