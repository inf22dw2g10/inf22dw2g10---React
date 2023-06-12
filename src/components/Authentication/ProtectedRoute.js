import { useContext, useEffect } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessBy === "non-authenticated") {
      if (user) {
        navigate("/");
      }
    } else if (accessBy === "authenticated") {
      if (!user) {
        navigate("/");
      }
    }else if (accessBy === "admin"){
      if(!user.admin){
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [accessBy, navigate, user]);

  return children;
};

export default ProtectedRoute;
