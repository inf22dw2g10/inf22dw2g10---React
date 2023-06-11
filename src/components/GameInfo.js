import styles from '../pages/styles/Game.module.css'


const GameInfo = ({gameinfo}) => {
        
    return (
        <div className={styles.infoMain}>
            <div className={styles.gameCoverContainer}>
                <h1>{gameinfo.title} - {gameinfo.year}</h1>
                <div className={styles.gameDescription}>
                <img src={gameinfo.cover} alt="game cover" className={styles.gameCover} />
                <div className={styles.gameInfo}>
                    <h3>{gameinfo.description}</h3>
                    <h4>{gameinfo.genre}</h4>
                    <h4>{gameinfo.price === 0 ? "Free" : `${gameinfo.price}€`}</h4>
                </div>
                </div>
                <div className={styles.gameLowerDesc}>
                <h4>{gameinfo.rating}</h4>
                </div>
            </div>
        </div>
    )
}


export default GameInfo;