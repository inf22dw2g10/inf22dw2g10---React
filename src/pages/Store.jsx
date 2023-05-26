import axios from "axios";
import { useQuery } from 'react-query';


const Store = () => {
  const { data: games, isLoading, error } = useQuery("games", () => {
    return axios.get("http://localhost:3000/games/").then((res) => res.data);
  },{ 
    retry: false
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
      <div>
        <h1>Store</h1>
        
        {games.map(game => (
          <div key={game.id}>{game.title}</div>
        ))}
      </div>
  );
};

export default Store;
