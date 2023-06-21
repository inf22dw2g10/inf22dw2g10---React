import StoreGame from '../components/Store/StoreGame';
import axios from 'axios';
import { useQuery } from 'react-query';
import styles from './styles/Store.module.css';
import LoadingPage from './LoadingPage';
import SearchGame from '../components/Store/SearchGame';
import PageMenu from '../components/Store/PageMenu';
import { useState, useEffect } from 'react';

const Store = () => {
  const [currentPage, setCurrentPage] = useState();

  const { data: games, isLoading, error, refetch } = useQuery(
    ['games', currentPage],
    () => {
      return axios
        .get(`http://${window.location.hostname}:5000/games?page=${currentPage}`)
        .then((res) => res.data);
    },
    {
      retry: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const changePage = (page) => {
    if( page !== currentPage){
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <div>No Games</div>;
  }

  return (
    <div className={styles.storeContainer}>
      <SearchGame />
      <div className={styles.storeItems}>
        {games.games.map((game) => (
          <StoreGame key={game.id} props={game} />
        ))}
      </div>
      <div className={styles.navContainer}>
        <PageMenu totalPages={games.totalPages} sendPage={changePage} />
      </div>
    </div>
  );
};

export default Store;
