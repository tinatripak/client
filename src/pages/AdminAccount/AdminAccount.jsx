import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import AdminPanel from "../AdminPanel/AdminPanel";
import { userVerification } from "../../api";

const AdminAccount = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await userVerification();
      const { status } = data;
      if(!status) {
        removeCookie("token");
        navigate("/login")
      }
    };
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