import LayoutScroll from '../components/Layout/LayoutScroll'
import StoreGame from '../components/StoreGame'
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from 'react-query';
import { useState} from "react";
import styles from './styles/Store.module.css'


const Store = () => {

  const [searchedGames, setSearchedGames] = useState(null);

  const { data: games, isLoading, error } = useQuery("games", () => {
    return axios.get("http://localhost:5000/games/").then((res) => res.data);
  },{ 
    retry: false
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const searchGames = async (event) =>{

    const searchInput = event.target.value.trim().replace( /\s\s+/g,' ' )
    
    if(searchInput !== "" ){
      try{
        const response = await axios.get(`http://localhost:5000/games/search?game=${searchInput}`)
        if(response.data !== ""){
          setSearchedGames(response.data.slice(0,5))
        }else{
          setSearchedGames(null)
        }
        
      }catch(err){
        setSearchedGames(null)
      }
    }else{
      setSearchedGames(null)
    }
  }

  const hideSearchBar = (event) =>{
    if(event.target.parentElement !== event.relatedTarget?.parentElement.parentElement){
      setSearchedGames(null)
    }
  }

  return (
      <LayoutScroll>
          <div className={styles.storeContainer} onBlur={hideSearchBar} >
              <div className={styles.outerSearchbar} >
                <input type="text" name="" id="searchGamesBar" className={styles.inputSearchGames} onChange={searchGames} onFocus={searchGames}  placeholder="Search Game..."/>
                    <div className={styles.innerSearchbar}  >
                      
                      {searchedGames !== null && 
                        searchedGames.map(game => (
                            <Link to={`/game/${game.id}`} key={game.id}><div><img src={game.cover} className={styles.imgSearchBar} alt={game.title} /></div><div>{game.title}</div></Link>
                        ))
                      }
                    </div>
              </div>

              <div className={styles.storeItems}>
                {games.map(game => (
                  <StoreGame key={game.id} props={game} />
                ))}
              </div>
          </div>
      </LayoutScroll>
  );  
};

export default Store;
