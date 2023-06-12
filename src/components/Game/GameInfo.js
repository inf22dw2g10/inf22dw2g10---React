import styles from '../../pages/styles/Game.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';


const GameComment = ({gameId}) => {

    const { data: game, isLoading, error } = useQuery("game", async() => {
        return axios.get(`http://${window.location.hostname}:5000/games/${gameId}`).then((res) => res.data);
    },{ 
        retry: false
    });

    if (isLoading || error) {
        return <div>Loading...</div>;
    }

    const buyGame = async () =>{    
        await axios.get(`http://${window.location.hostname}:5000/users/addGame/${gameId}`, {withCredentials:true})
        .then((result) => {
            window.location.reload(false);
        })
        .catch((err) => {
        });
    }

    return(
        <>
            <div className={styles.gameDescription}>
                <div className={styles.gameCover} style={{ backgroundColor: "rgb(70,70,70)", backgroundImage: `url(${game.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} ></div>
                <div className={styles.gameBuy}>
                    <h3>{game.title}</h3>
                    <h4>{game.price === 0 ? "Free" : `${game?.price}€`}</h4>
                    <button onClick={buyGame}> Buy Game</button>
                </div>
            </div>
        </>
    )
};

export default GameComment;