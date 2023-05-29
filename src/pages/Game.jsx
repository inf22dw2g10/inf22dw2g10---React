import axios from "axios";
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";

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
        <>
            <div>{JSON.stringify(game)}</div>
        </>
    );
}

export default Game;
