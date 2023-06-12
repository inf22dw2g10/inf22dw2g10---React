import styles from './SearchUser.module.css'
import axios from "axios";
import { useState} from "react";
import { Link } from "react-router-dom";

const SearchUser = () => {

  const [searchedUsers, setSearchedUsers] = useState(null);

  const searchUsers = async (event) =>{

      const searchInput = event.target.value.trim().replace( /\s\s+/g,' ' )
      
      if(searchInput !== "" ){
        try{
          const response = await axios.get(`http://${window.location.hostname}:5000/users/search?user=${searchInput}`, {withCredentials:true})
          if(response.data !== ""){
            setSearchedUsers(response.data.slice(0,5))
          }else{
            setSearchedUsers(null)
          }
          
        }catch(err){
          setSearchedUsers(null)
        }
      }else{
        setSearchedUsers(null)
      }
  }
  
  const hideSearchBar = (event) =>{
      if(event.target.parentElement !== event.relatedTarget?.parentElement.parentElement){
        setSearchedUsers(null)
      }
  }


  return (
    <div className={styles.outerSearchbar}  onBlur={hideSearchBar}>
      <input type="text" name="" id="searchGamesBar" className={styles.inputSearchUsers} onChange={searchUsers} onFocus={searchUsers}  placeholder="Search User..."/>
      <div className={styles.innerSearchbarUsers} onClick={hideSearchBar} >
        {searchedUsers !== null && 
          searchedUsers.map(user => (
            <Link to={`/profile/${user.id}`} key={user.id}><div>{user.username}</div></Link>
          ))
        }
      </div>
  </div>
  )
}

export default SearchUser