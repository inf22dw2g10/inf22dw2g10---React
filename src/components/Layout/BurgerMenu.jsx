import React, { useState, useEffect, useContext} from 'react';
import AuthContext from "../../providers/AuthProvider";
import styles from './BurgerMenu.module.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BurgerMenu = () => {
  const location = useLocation();

  const {logout } = useContext(AuthContext);
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
        <li><Link to="/">Store</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link className={styles.navLinks} onClick={logout}>Logout</Link></li>
      </ul>
    </div>
  );
};

export default BurgerMenu;