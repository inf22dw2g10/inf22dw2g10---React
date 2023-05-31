import { Link } from 'react-router-dom'
import styles from '../pages/styles/Store.module.css'
const StoreGame = ({props}) => {

  return (
    <Link to={`/game/${props.id}`}>
      <div className={styles.gameCard}  style={{ backgroundColor: "rgb(70,70,70)", backgroundImage: `url(${props.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}> 
        <div className={styles.gameCardInfo}>
            <span>{props.title}</span><span>{props.price}€</span>
        </div>
      </div>
    </Link>
  )
}

export default StoreGame