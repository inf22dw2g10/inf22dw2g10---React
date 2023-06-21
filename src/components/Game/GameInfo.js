import styles from '../../pages/styles/Game.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';


const GameComment = ({gameId}) => {

    const [axiosError, setAxiosError] = useState(null)

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
        .then((res) => {
            window.location.reload(false)
        })
        .catch((err) => {
            setAxiosError('Error buying the game')
        });
    }

    return(
        <>
            <div className={styles.gameDescription}>
                <div className={styles.gameCover} style={{ backgroundColor: "rgb(70,70,70)", backgroundImage: `url(${game.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} ></div>
                <div className={styles.gameBuy}>
                    <h3>{game.title}</h3>
                    <p style={{textAlign:'center'}}>{game.description}</p>
                    <h4>{game.price === 0 ? "Free" : `${game?.price}€`}</h4>
                    <button onClick={buyGame}> Buy Game</button>
                    {axiosError && 
                    <p className={styles.errorMessage}>{axiosError}</p>}
                </div>
            </div>
        </>
    )
};

export default GameComment;