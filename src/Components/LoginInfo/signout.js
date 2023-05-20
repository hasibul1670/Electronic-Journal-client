import { useContext } from "react";
import { useNavigate } from "react-router";
import { loginUserContext } from "../../App";

export const useSignOut = () => {
  const [loginUserEmail, setLoginUserEmail] = useContext(loginUserContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    setLoginUserEmail(null);
    localStorage.removeItem("loginUserEmail");
    navigate("/login");
    console.log("logout successful", loginUserEmail);
  };

  return handleSignOut;
};
