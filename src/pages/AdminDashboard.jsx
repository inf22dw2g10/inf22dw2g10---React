import { useState } from "react"
import styles from './styles/AdminDashboard.module.css'
import { Link } from "react-router-dom"
import CreateGame from "../components/AdminDashboard/CreateGame"
import EditGame from "../components/AdminDashboard/EditGame"

const AdminDashboard = () => {
  const [panel, setPanel] = useState('games')

  return (

      <div  className={styles.dashboardContainer}>
        <div className={styles.dashboardNavigation}>
          <div><Link onClick={()=> setPanel('games')}>Games</Link></div>
        </div>
        <div className={styles.dashboardMain}>
          {panel === 'games' &&
            <div className={styles.gamesPanel} >
              <CreateGame/>
              <EditGame/>
            </div>
          }
        </div>
      </div>

  )
}

export default AdminDashboard