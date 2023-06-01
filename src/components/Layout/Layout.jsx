import styles from './Layout.module.css'
import Navbar from './Navbar';


const Layout = ({children}) => {
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
