import { Link } from "react-router-dom"
import AuthContext from "../providers/AuthProvider";
import { useContext } from "react";


const Navbar = () => {
  const { user,logout } = useContext(AuthContext);
  console.log(user?.admin)
  return (
    <div><Link to="/" >Store</Link> {!user && <><Link to="/login">Login</Link> <Link to="/register">Register</Link></>} {user && <Link onClick={logout}>Logout</Link> } {user?.admin  && <Link>Admin Dashboard</Link>}</div>
  )
}

export default Navbar