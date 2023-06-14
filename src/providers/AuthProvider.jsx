import axios from "axios";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if(Cookies.get("token")){
      return jwtDecode(Cookies.get("token"));
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async () => {
    setUser(jwtDecode(Cookies?.get("token")))
    navigate("/");
  };
  
  const logout = async () => {
    try{
      await axios.get(`http://${window.location.hostname}:5000/users/logout`, { withCredentials: true });
      setUser(null);
      navigate("/login");
    }catch(err){
      setUser(null);
      navigate("/login");
    }
  };
 
  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
 
export default AuthContext;