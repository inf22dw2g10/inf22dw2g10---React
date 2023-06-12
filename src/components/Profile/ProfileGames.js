import { Link } from 'react-router-dom'
import styles from '../../pages/styles/Profile.module.css'

const ProfileGames = ({game}) => {

  return (
    
        <div className={styles.userGame}  style={{ backgroundColor: "rgb(70,70,70)", backgroundImage: `url(${game.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <Link to={`/game/${game.id}`} > 
                <span>{game.title}</span>
            </Link>
        </div>
    
  )
}

export default ProfileGames
