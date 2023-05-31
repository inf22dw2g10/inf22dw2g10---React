import styles from './Layout.module.css'
import AuthContext from "../../providers/AuthProvider";
import Navbar from './Navbar';
import { useContext } from "react";


const Layout = ({children}) => {
  const { user,logout } = useContext(AuthContext);
  return (
    <div className={styles.mainContainer}>
      <Navbar/>
      <main className={styles.mainLayout}>
        {children}
      </main>
    </div>
  )
}

export default Layout
