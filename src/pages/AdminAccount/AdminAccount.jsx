import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import AdminPanel from "../AdminPanel/AdminPanel";
import {userVerification} from '../../services/LoginService'
import { loginLink } from "../../constants";

const AdminAccount = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  
  const verifyCookie = async () => {
    if (!cookies.token) {
      navigate(loginLink);
    }
    const { data } = await userVerification();
    const { status } = data;
    if(!status) {
      removeCookie("token");
      navigate(loginLink)
    }
  };
  
  useEffect(() => {
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <div>
      <AdminPanel/>
      <ToastContainer />
    </div>
  );
};

export default AdminAccount;