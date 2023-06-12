import React, { useState, useEffect, useContext} from 'react';
import AuthContext from "../../providers/AuthProvider";
import styles from './BurgerMenu.module.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchUser from './SearchUser';

const BurgerMenu = () => {
  
  const location = useLocation();
  let currentPath = location.pathname;
  currentPath = currentPath.split('/')[1]

  const {user,logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname]);

  return (
    <div className={styles.burgerMenu}>
      <div className={`${styles.burgerIcon} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <ul className={`${styles.menuItems} ${isOpen ? styles.open : ''}`}>
        <div className={styles.closeButton} onClick={() => setIsOpen(false)}>x</div>
        {user && <li>{user && <SearchUser/>}</li> }
        <li><Link to="/">Store</Link></li>
        {user?.admin && <li><Link to="/admin" className={`${currentPath === "admin" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Admin</Link></li>}
        {user &&
                <>
                  <li><Link to={`/profile/${user.id}`} className={`${currentPath === "profile" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Profile</Link></li>
                  <li><Link to="/editprofile" className={`${currentPath === "editprofile" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Edit Profile</Link></li>
                  <li><Link className={styles.navLinks} onClick={logout}>Logout</Link></li>
                </>
        }
        {!user &&    
            <>
              <li><Link to="/login" className={`${currentPath === "login" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Login</Link></li>
              <li><Link to="/register" className={`${currentPath === "register" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Register</Link></li>
            </>
        }
      </ul>
    </div>
  );
};

export default BurgerMenu;