import axios from "axios";
import { useState} from "react";
import { Link } from "react-router-dom";
import styles from '../../pages/styles/Store.module.css'

const SearchGame = () => {

    const [searchedGames, setSearchedGames] = useState(null);

    const searchGames = async (event) =>{

        const searchInput = event.target.value.trim().replace( /\s\s+/g,' ' )
        
        if(searchInput !== "" ){
          try{
            const response = await axios.get(`http://${window.location.hostname}:5000/games/search?game=${searchInput}`)
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
        <div className={styles.outerSearchbar} onBlur={hideSearchBar}>
            <input type="text" name="" id="searchGamesBar" className={styles.inputSearchGames} onChange={searchGames} onFocus={searchGames}  placeholder="Search Game..."/>
            <div className={styles.innerSearchbar}  >
              
              {searchedGames !== null && 
                searchedGames.map(game => (
                    <Link to={`/game/${game.id}`} key={game.id}><div><img src={game.cover} className={styles.imgSearchBar} alt={game.title} /></div><div>{game.title}</div></Link>
                ))
              }
            </div>
      </div>
    )
}

export default SearchGame