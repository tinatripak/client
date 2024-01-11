import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import AdminPanel from "../AdminPanel/AdminPanel";
import { userVerification } from "../../services/LoginService";
import { loginLink } from "../../constants";

const AdminAccount = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (!cookies?.token) {
      navigate(loginLink);
    }
  });
  
  const verifyCookie = async () => {
    await userVerification(cookies);
  };

  useEffect(() => {
    verifyCookie();
  }, [cookies]);

  return (
    <div>
      <AdminPanel />
      <ToastContainer />
    </div>
  );
};

export default AdminAccount;
