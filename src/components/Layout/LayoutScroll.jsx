import styles from './LayoutScroll.module.css'
import Navbar from './Navbar';

const LayoutScroll = ({children}) => {
  return (
    <div className={styles.mainContainer}>
      <Navbar/>
      <main className={styles.mainLayout2}>
        {children}
      </main>
    </div>
  )
}

export default LayoutScroll
