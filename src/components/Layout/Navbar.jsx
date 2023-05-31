import styles from './Navbar.module.css'
import { Link } from "react-router-dom"
import AuthContext from "../../providers/AuthProvider";
import { useContext } from "react";
import SearchUser from '../SearchUser';
import UserAvatar from '../UserAvatar';
import Balance from '../Balance';


const Navbar = () => {
    const { user,logout } = useContext(AuthContext);
    return (
        <>
        <nav className={styles.navLayout}>

            <div className={styles.middleNav}>
            {user && <SearchUser/>
            }
            <Link to="/" >Store</Link>   
            {user?.admin &&<Link>Admin Dashboard</Link>}
            {user &&
                <>
                    <Link to="/" >Biblioteca</Link>
                    <Link onClick={logout}>Logout</Link>  
                </>
            }
            {!user &&    
                <>
                <Link to="/login" >Login</Link>
                <Link to="/register" >Register</Link>
                </>
            }
            </div>
            {user &&
                <div className={styles.userNav}>
                    <Link to={`/profile/${user?.id}`}></Link>&nbsp;<span><Link to={`/profile/${user?.id}`}>{user?.username}</Link><Link to={`/profile/${user?.id}`}><Balance/></Link></span>
                </div>
            }
        </nav>
        <nav className={styles.navMobile}>
            <div>
                burger
            </div>
            {user &&
                <div className={styles.mobileUserNav}>
                    <Link to={`/profile/${user?.id}`}></Link>&nbsp;<Link to={`/profile/${user?.id}`}><span>{user?.username}</span></Link>
                </div>
            }
        </nav>
       </>
    )
}

export default Navbar