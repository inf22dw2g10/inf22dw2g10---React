
import StoreGame from '../components/Store/StoreGame'
import axios from "axios";
import { useQuery } from 'react-query';
import styles from './styles/Store.module.css'
import LoadingPage from './LoadingPage';
import SearchGame from '../components/Store/SearchGame';


const Store = () => {

  const { data: games, isLoading, error } = useQuery("games", () => {
    return axios.get(`http://${window.location.hostname}:5000/games/`).then((res) => res.data);
  },{ 
    retry: false
  });

  if (isLoading) {
    return <LoadingPage/>;
  }

  if (error) {
    return <div>No Games</div>;
  }
  return (
        <div className={styles.storeContainer} >
            <SearchGame/>
            <div className={styles.storeItems}>
              {games.map(game => (
                <StoreGame key={game.id} props={game} />
              ))}
            </div>
        </div>

  );  
};

export default Store;
