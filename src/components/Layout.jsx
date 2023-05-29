import "./Layout.css"
import { Link } from "react-router-dom"
import AuthContext from "../providers/AuthProvider";
import { useContext } from "react";
import "./styles/Forms.css"
import "./styles/Store.css"


const Navbar = ({children}) => {
  const { user,logout } = useContext(AuthContext);
  return (
    <>
      <nav><Link to="/" >Store</Link>{!user && <><Link to="/login">Login</Link> <Link to="/register">Register</Link></>} {user && <>{user.username} <Link>Admin Dashboard</Link>  <Link onClick={logout}>Logout</Link></>}</nav>
      <main>
        {children}
      </main>
    </>
  )
}

export default Navbar