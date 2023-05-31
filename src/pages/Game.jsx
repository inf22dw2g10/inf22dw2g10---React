import axios from "axios";
import Layout from '../components/Layout/Layout'
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";
import styles from './styles/Game.module.css'

const Game = () => {
    const { gameId } = useParams();

    const { data: game, isLoading,isError, error } = useQuery("game", async() => {
        return axios.get(`http://localhost:5000/games/${gameId}`).then((res) => res.data);
    },{ 
        retry: false
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Game Not Found</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Layout>
            <div className={styles.gameContainer}>
                {JSON.stringify(game)}
            </div>
        </Layout>
    );
}

export default Game;
