import styles from './Navbar.module.css'
import { Link } from "react-router-dom"
import AuthContext from "../../providers/AuthProvider";
import { useContext } from "react";
import SearchUser from '../SearchUser';
import UserAvatar from '../UserAvatar';
import Balance from '../Balance';
import BurgerMenu from './BurgerMenu';
import { useLocation } from 'react-router-dom';


const Navbar = () => {

    const location = useLocation();
    let currentPath = location.pathname;
    currentPath = currentPath.split('/')[1]

    const { user,logout } = useContext(AuthContext);
    return (
        <>
        <nav className={styles.navLayout}>

            <div className={styles.middleNav}>
            {user && <SearchUser/>
            }
            <Link to="/" className={`${currentPath === "" ? styles.currentPageLink : ''} ${styles.navLinks}` } >Store</Link>   
            {user?.admin && <Link to="/" className={`${currentPath === "admin" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Admin</Link>}
            {user &&
                <>
                    <Link to="/library" className={`${currentPath === "library" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Library</Link>
                    <Link className={styles.navLinks} onClick={logout}>Logout</Link>  
                </>
            }
            {!user &&    
                <>
                <Link to="/login" className={`${currentPath === "login" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Login</Link>
                <Link to="/register" className={`${currentPath === "register" ? styles.currentPageLink : ''} ${styles.navLinks}` }  >Register</Link>
                </>
            }
            </div>
            {user &&
                <div className={styles.userNav}>
                    <Link to={`/profile/${user?.id}`}>{user && <UserAvatar/>}</Link>&nbsp;<span><Link to={`/profile/${user?.id}`}>{user?.username}</Link><Link to={`/profile/${user?.id}`}><Balance/></Link></span>
                </div>
            }
        </nav>
        <nav className={styles.navMobile}>
            <div>
                <BurgerMenu/>
            </div>
            {user &&
                <div className={styles.mobileUserNav}>
                    <Link to={`/profile/${user?.id}`}>{user && <UserAvatar/>}</Link>&nbsp;<Link to={`/profile/${user?.id}`}><span>{user?.username}</span></Link>
                </div>
            }
        </nav>
       </>
    )
}

export default Navbar