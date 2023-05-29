import { useContext, useEffect } from "react";
import Cookies from 'js-cookie';
import AuthContext from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const CheckLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(Cookies.get("token") !== undefined){
        login();
    } else {
        navigate("/");
    }
  
  }, [login, navigate]);
};

export default CheckLogin;