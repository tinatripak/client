import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import AdminPanel from "../AdminPanel/AdminPanel";
import { userVerification } from "../../services/LoginService";
import { loginLink } from "../../constants";

const AdminAccount = () => {
  const navigate = useNavigate();
  const [cookies, remove] = useCookies([]);

  const verifyCookie = async () => {
    if (cookies?.token === "undefined") {
      navigate(loginLink);
    } else {
      const { data } = await userVerification(cookies);
      if (!data) {
        remove("token");
        navigate(loginLink);
      }
    }
  };

  useEffect(() => {
    verifyCookie();
  }, [cookies, navigate, remove]);

  return (
    <div>
      <AdminPanel />
      <ToastContainer />
    </div>
  );
};

export default AdminAccount;
