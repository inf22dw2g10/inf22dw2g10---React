import csgo from '../images/csgo.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from 'react-query';
import { useState } from "react";


const Store = () => {

  const [searchedGames, setSearchedGames] = useState(null);

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


  const searchGames = async (event) =>{

    const searchInput = event.target.value.trim().replace( /\s\s+/g,' ' )
    
    if(searchInput !== "" ){
      try{
        const response = await axios.get(`http://localhost:3000/games/search?game=${searchInput}`)
        if(response.data !== ""){
          setSearchedGames(response.data)
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


  return (
      <div className="store-container">
        <div className="outer-searchbar" >
          <input type="text" name="" className="input-search-games" onChange={searchGames} onFocus={searchGames}  placeholder="Search Game..."/>
          <div className="inner-searchbar" >
            {searchedGames !== null && 
              searchedGames.map(game => (
                  <Link to={`/game/${game.id}`} key={game.id} className="result-searchbar" ><img src={csgo} alt={game.title} height="90%"/>{game.title}</Link>
              ))
            }
          </div>
        </div>
        <div className="store-items">
          {games.map(game => (
            <div key={game.id}>{game.title}</div>
          ))}
        </div>
      </div>
  );
};

export default Store;
